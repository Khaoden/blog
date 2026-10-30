---
title: Spring IoC：从手动组装到构造器注入
shortTitle: Spring IoC
date: 2024-03-20
lastUpdated: 2026-10-29
tags: ['Java', 'Spring', 'IoC', '依赖注入']
category: learning
description: 沿着对象创建、依赖注入与生命周期理解 Spring 容器，并用构造器注入明确业务对象的依赖。
aside: true
outline: deep
---

先不要急着记注解。一个服务需要另一个对象时，总要有人负责创建它们并把它们连起来。IoC（控制反转）改变的是这项组装工作的归属：从业务对象内部，交给外部的容器。

依赖注入是实现 IoC 的一种方式。构造器注入、setter 注入都属于依赖注入，而 IoC 并不只等于某个 Spring 注解。

## 从不依赖框架的写法开始

```java
interface MessageSender {
    void send(String message);
}

class WelcomeService {
    private final MessageSender sender;

    WelcomeService(MessageSender sender) {
        this.sender = sender;
    }

    void welcome() {
        sender.send("hello");
    }
}
```

调用方可以自己 `new WelcomeService(sender)`。服务只声明“我需要一个发送器”，不需要知道发送器的具体实现和创建细节。这正是后续引入容器时可以保留的设计。

## 让 Spring 管理对象的组装

以下是基于 Spring Framework 6 的最小配置示例，需要 Java 17+ 和 `org.springframework:spring-context` 依赖。它用于说明容器行为，不是独立的纯 JDK 程序。

```java
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

public class IocDemo {
    interface MessageSender {
        void send(String message);
    }

    static class WelcomeService {
        private final MessageSender sender;

        WelcomeService(MessageSender sender) {
            this.sender = sender;
        }

        void welcome() {
            sender.send("hello from the container");
        }
    }

    @Configuration
    static class AppConfig {
        @Bean
        MessageSender messageSender() {
            return System.out::println;
        }

        @Bean
        WelcomeService welcomeService(MessageSender sender) {
            return new WelcomeService(sender);
        }
    }

    public static void main(String[] args) {
        try (var context = new AnnotationConfigApplicationContext(AppConfig.class)) {
            context.getBean(WelcomeService.class).welcome();
        }
    }
}
```

`@Bean` 方法定义容器中的对象；方法参数声明依赖，由容器寻找匹配的 Bean 并传入。`ApplicationContext` 则提供配置读取、对象获取、事件与生命周期等能力。

在使用组件扫描的项目中，也可以用 `@Component`、`@Service` 等注册组件。Spring 4.3 起，只有一个构造器的 Bean 通常不需要在构造器上额外标记 `@Autowired`。

## 为什么经常优先选择构造器注入

构造器可以把必需依赖放在显眼的位置，支持 `final` 字段，也方便在测试中直接创建对象。相比之下，字段注入可能让一个看似能直接 `new` 的对象，在真正调用时才因依赖没有赋值而失败。

这不意味着 setter 注入没有用途。可选依赖或需要后续配置的对象，可以按具体约束选择不同方式。

如果一个构造器需要十几个协作者，应先检查对象是否承担了过多职责；把注入方式换成字段，并不会减少这些依赖。

## 同一接口有多个实现怎么办

容器按类型查找时，如果发现多个同样合适的 Bean，通常无法直接决定注入哪一个。可以使用：

- `@Qualifier`：明确选择具有特定限定标识的 Bean。
- `@Primary`：在多个候选项中声明首选实现。
- `List<MessageSender>`：业务确实需要全部实现时，接收集合。

不要为了让启动通过就随意加 `@Primary`。选择哪个实现，本来就是需要明确的业务或配置决定。

## 生命周期：创建之后，还会发生什么

可以先用这个简化顺序建立概念：实例化 → 填充依赖 → 初始化回调 → 对外提供使用 → 容器关闭时销毁。Bean 后处理器能参与其中，AOP 代理也可能在这条链路上产生。

实际流程比这更细，涉及作用域、延迟初始化和各类扩展点。调试时需要区分“对象构造完毕”和“容器已经完成初始化”，两者并不是同一个时间点。

默认 singleton 指的是**每个容器、每个 Bean 定义**的一份实例，并不是整个 JVM 全局只有一个。单例也不等于线程安全：如果 Bean 保存可变的请求状态，仍可能发生并发问题。

## 遇到启动失败时的排查顺序

1. Bean 是否注册了？检查扫描范围、配置导入和条件配置。
2. 类型是否匹配？是否有多个候选实现？
3. 依赖方向是否形成循环？两个构造器互相等待对方，往往提示职责边界需要调整。
4. 初始化是否执行了外部操作？数据库、网络或文件错误也可能表现为创建失败。

继续阅读 [Spring AOP](/blog/posts/learning/Spring/aop)，理解容器交给调用方的对象为什么有时会是一个代理。

参考：[Spring IoC 容器](https://docs.spring.io/spring-framework/reference/core/beans.html)、[依赖注入](https://docs.spring.io/spring-framework/reference/core/beans/dependencies/factory-collaborators.html)、[Bean 作用域](https://docs.spring.io/spring-framework/reference/core/beans/factory-scopes.html)。
