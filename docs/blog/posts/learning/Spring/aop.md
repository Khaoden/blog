---
title: Spring AOP：理解代理与调用边界
date: 2024-03-20
lastUpdated: 2026-10-29
tags: ['Java', 'Spring', 'AOP', '代理']
category: learning
description: 用方法计时理解切面、切点与通知，重点说明代理调用、自调用和事务不生效的边界。
aside: true
outline: deep
---

日志、计时、权限与事务，往往会横跨多个业务方法。AOP 把这些共同逻辑组织在独立位置，让业务方法专注于自己的工作。

理解 Spring AOP 时，最重要的不是记住几个通知注解，而是确认一次调用有没有经过代理。

## 先对齐几个术语

| 术语 | 在 Spring AOP 中可以怎样理解 |
| --- | --- |
| Aspect，切面 | 组织一组横切逻辑的模块 |
| Join point，连接点 | Spring AOP 支持的方法执行位置 |
| Pointcut，切点 | 筛选哪些方法需要被增强的规则 |
| Advice，通知 | 在方法前、后或周围执行的逻辑 |
| Target，目标对象 | 实际执行业务方法的对象 |
| Proxy，代理 | 调用方先接触到的包装对象，负责串起通知与目标方法 |

Spring AOP 的代理模式主要处理方法执行；它不直接覆盖字段读写、构造器执行等所有连接点。需要更广泛的织入能力时，要区分它与完整的 AspectJ 机制。

## 一个方法计时的切面

下面的示例针对 Spring Framework 6 与 AspectJ 注解风格。需要 `spring-context`、`spring-aop`、`aspectjweaver` 等对应依赖，并让切面类被 Spring 注册。

```java
package example;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class TimingAspect {
    private static final System.Logger LOG =
        System.getLogger(TimingAspect.class.getName());

    @Around("execution(public * example.service..*(..))")
    public Object measure(ProceedingJoinPoint point) throws Throwable {
        long started = System.nanoTime();
        try {
            return point.proceed();
        } finally {
            long elapsed = System.nanoTime() - started;
            LOG.log(System.Logger.Level.INFO,
                point.getSignature().toShortString() + " took " + elapsed + " ns");
        }
    }
}
```

这个切点匹配 `example.service` 包及其子包中的 public 方法。普通 Java 配置可以通过 `@EnableAspectJAutoProxy` 开启自动代理；切面与目标服务都必须由容器管理，组件扫描也要包含它们。

`proceed()` 执行后续调用链或目标方法。示例使用 `finally` 记录耗时，因此目标方法抛出异常时也会记录，并继续向外传播原始异常。

不要为了记录异常就捕获后返回 `null`。那会改变业务方法的错误语义，甚至让调用方把失败当成成功。日志内容也应避免直接写入密码、令牌或完整个人信息。

## 代理怎样影响一次调用

可以把正常路径画成：

```text
调用方 → Spring 代理 → 前置 / 环绕逻辑 → 目标方法
                          ↑               │
                          └── 返回值或异常 ┘
```

对象如果是调用方自行 `new` 出来的，而没有经过相应代理创建流程，即使它的类上写了注解，也不会因此自动得到 Spring AOP 增强。

Spring AOP 常见的代理方式有 JDK 动态代理与基于类的代理。前者围绕接口工作，后者通过子类增强。具体选用哪种还取决于项目配置，不应把某个 Spring Boot 版本的默认值当成所有 Spring 项目的规则。

## 最常见的边界：同一个对象内部调用

```java
public void outer() {
    this.inner();
}

public void inner() {
    // 匹配切点，也不代表 this 调用会重新进入外层代理。
}
```

在通常的代理型 Spring AOP 中，`outer` 进入目标对象后，`this.inner()` 是目标对象内部的直接调用。它没有再穿过调用方持有的代理，因此 `inner` 上的增强不会因为这次自调用而单独触发。

如果遇到事务注解“明明写了却没生效”，应检查调用路径、对象是否受容器管理、方法能否被当前代理方式增强，以及事务是否真的被启用。

更容易维护的处理方式，通常是把需要独立事务或增强边界的操作移到另一个职责清楚的 Bean 中，让调用通过它的代理进入，而不是到处寻找自己的代理引用。

## final、private 与代理能力

基于子类的代理不能覆盖 `final` 方法，也不能继承 `final` 类。`private` 方法无法通过普通子类覆盖来增强。JDK 代理则通过接口暴露调用能力。

方法可见性的支持范围也会受具体代理、增强机制及框架版本影响。设计公共服务边界时，优先用清晰的 public 方法表达外部协作，避免依赖这些细节来承载关键行为。

多个切面同时存在时，还需要明确执行顺序。尤其是计时、重试与事务的嵌套方式不同，得到的行为和统计口径也会不同。

## 验证增强是否真的发生

至少检查这几条有区别的路径：通过容器获取的对象调用、自行创建对象调用、内部自调用、目标方法正常返回、目标方法抛出异常。测试应确认返回值和异常仍符合约定，同时确认需要的通知被执行。

这样验证的是实际调用边界，比只检查类上有没有注解更有意义。

前置阅读：[Spring IoC](/blog/posts/learning/Spring/ioc)。也可以回到 [面向对象](/blog/posts/learning/javaSE/面向对象)，从组合与职责分离的角度重新理解代理。

参考：[Spring AOP](https://docs.spring.io/spring-framework/reference/core/aop.html)、[代理机制与自调用](https://docs.spring.io/spring-framework/reference/core/aop/proxying.html)、[声明式事务](https://docs.spring.io/spring-framework/reference/data-access/transaction/declarative.html)。
