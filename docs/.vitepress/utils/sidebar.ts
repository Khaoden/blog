import fs from 'fs'
import path from 'path'

// 定义侧边栏项目的类型
interface SidebarItem {
  text: string
  link?: string
  items?: SidebarItem[]
  collapsed?: boolean
}

// 生成侧边栏配置
export function generateSidebar(): Record<string, SidebarItem[]> {
  const docsPath = path.resolve(__dirname, '../../')
  const sidebar: Record<string, SidebarItem[]> = {}

  // 读取特定目录
  const directories = ['blog', 'friend', 'project']
  
  directories.forEach(dir => {
    const dirPath = path.join(docsPath, dir)
    if (fs.existsSync(dirPath)) {
      const items = generateSidebarItems(dirPath, `/${dir}`)
      if (items.length > 0) {
        sidebar[`/${dir}`] = items
      }
    }
  })

  return sidebar
}

// 生成侧边栏项目
function generateSidebarItems(dirPath: string, baseLink: string): SidebarItem[] {
  const items: SidebarItem[] = []
  
  if (!fs.existsSync(dirPath)) return items

  const files = fs.readdirSync(dirPath)
  
  files.forEach(file => {
    const filePath = path.join(dirPath, file)
    const stat = fs.statSync(filePath)
    
    // 忽略特定文件和目录
    if (file.startsWith('.') || file === 'node_modules') return
    
    if (stat.isDirectory()) {
      // 处理目录
      const subItems = generateSidebarItems(filePath, `${baseLink}/${file}`)
      if (subItems.length > 0) {
        items.push({
          text: file,
          collapsed: true,
          items: subItems
        })
      }
    } else if (file.endsWith('.md') && file !== 'index.md') {
      // 处理 markdown 文件
      const name = file.replace('.md', '')
      items.push({
        text: name,
        link: `${baseLink}/${name}`
      })
    }
  })

  return items
} 