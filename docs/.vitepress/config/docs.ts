import fs from 'fs'
import path from 'path'

interface DocItem {
  path: string
  title: string
  children?: DocItem[] | Record<string, DocItem>
}

function getDirectoryStructure(dirPath: string): DocItem | null {
  const baseName = path.basename(dirPath)
  
  // 读取目录内容
  if (!fs.existsSync(dirPath)) return null
  const items = fs.readdirSync(dirPath)
  
  // 查找目录下的配置文件（可选）
  const configPath = path.join(dirPath, '_config.json')
  const hasConfig = fs.existsSync(configPath)
  const config = hasConfig ? JSON.parse(fs.readFileSync(configPath, 'utf-8')) : {}
  
  const result: DocItem = {
    path: baseName,
    title: config.title || formatTitle(baseName),
  }

  const children: Record<string, DocItem> = {}
  
  items.forEach(item => {
    // 跳过配置文件和特殊文件
    if (item.startsWith('_') || item.startsWith('.')) return
    
    const itemPath = path.join(dirPath, item)
    const stat = fs.statSync(itemPath)
    
    if (stat.isDirectory()) {
      const subStructure = getDirectoryStructure(itemPath)
      if (subStructure) {
        children[item] = subStructure
      }
    }
  })
  
  if (Object.keys(children).length > 0) {
    result.children = children
  }
  
  return result
}

// 格式化目录名为标题
function formatTitle(name: string): string {
  return name
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// 获取文档结构
export function getDocsPaths() {
  const docsPath = path.resolve(__dirname, '../../blog/posts')
  const structure = getDirectoryStructure(docsPath)
  
  if (!structure?.children) return {}
  
  return structure.children
}

// 导出动态生成的文档路径
export const docsPaths = getDocsPaths()