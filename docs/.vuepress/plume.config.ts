import axios from 'axios'
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'

async function getGithubProfile() {
  return await axios
    .get('https://api.github.com/user/146246')
    .then((res) => res.data)
}

export async function getPlumeConfig() {
  const profile = await getGithubProfile()
  const avatarResponse = await axios
    .get(profile.avatar_url, { responseType: 'arraybuffer' })
    .then((res) => res.data)
  const publicDir = join(process.cwd(), 'docs', '.vuepress', 'public')
  writeFileSync(join(publicDir, 'avatar.png'), avatarResponse)

  return {
    logo: '/logo@0.1x.png',
    profile: {
      avatar: `/avatar.png`,
      name: profile.name,
      description: profile.bio,
      circle: true,
    },
    changelog: true,
    plugins: {
      // 如果您在此处直接声明为 true，则表示开发环境和生产环境都启用该功能
      git: process.env.NODE_ENV === 'production'
    },
    copyright: 'CC-BY-SA-4.0',
    comment: {
      provider: 'Giscus',
      comment: true,
      repo: 'dahaha-365/yanet-blog',
      repoId: 'R_kgDOQwqDaw',
      category: '博客评论',
      categoryId: 'DIC_kwDOQwqDa84C0aW0',
    },
    markdown: {
      field: true,
    },
    social: [
      {
        icon: 'github',
        link: profile.html_url,
      },
    ],
    autoFrontmatter: {
      permalink: true, // 生成永久链接
      createTime: true, // 生成创建时间
      title: true, // 生成标题
    },
    collections: [
      {
        type: 'post',
        dir: 'blog',
        linkPrefix: 'blog',
        title: '博客',
      },
      {
        type: 'doc',
        dir: 'github',
        linkPrefix: 'github',
        title: '逛逛Github',
      },
    ],
  }
}
