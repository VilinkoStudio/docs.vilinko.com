import { defineConfig } from 'vitepress';
import vitepressProtectPlugin from "vitepress-protect-plugin";
import { withMermaid } from 'vitepress-plugin-mermaid'; // mermaid
// import { generateSidebar } from "vitepress-sidebar";

// 创建导航配置函数
function createNav(lang = 'zh') {
  if (lang === 'en') {
    return [
      { text: 'Home', link: '/en/' },
      {
        text: "LINKS",
        items: [
          { text: 'Vilinko Studio', link: 'https://www.vilinko.com' },
          { text: 'LightFrame', link: 'https://lightframe.vilinko.com' },
          { text: 'LFS', link: 'https://lfs.vilinko.com' },
          { text: 'Pogget', link: 'https://pogget.vilinko.com'}
        ],
      },
      {
        text: "ABOUT",
        items: [
          { text: 'About Vilinko Studio', link: '/en/about/index' },
          { text: '❤ Sponsor', link: 'https://afdian.com/a/EnderMo' },
        ],
      },
    ];
  }
  
  // 默认中文导航
  return [
    { text: '首页', link: '/' },
    {
      text: "工作室链接",
      items: [
        { text: 'Vilinko Studio', link: 'https://www.vilinko.com' },
        { text: 'LightFrame', link: 'https://lightframe.vilinko.com' },
        { text: 'LFS', link: 'https://lfs.vilinko.com' },
        { text: 'Pogget', link: 'https://pogget.vilinko.com'}
      ],
    },
    {
      text: "关于我们",
      items: [
        { text: '关于 Vilinko Studio', link: '/about/index' },
        { text: '❤ 支持我们', link: 'https://afdian.com/a/EnderMo' },
      ],
    },
  ];
}

// 创建侧边栏配置函数
function createSidebar(lang = 'zh') {
  if (lang === 'en') {
    return [
//      {
//        text: 'Universe',
//        collapsed: true,
//        items: [
//          { text: 'Introduction', link: '/en/docs/universe/index' }
//        ]
//      },
      {
        text: 'LightFrame',
//        collapsed: true,
        items: [
          { text: 'Basic Introduction', link: '/en/docs/lightframe/index' },
          { text: 'User Manual', link: '/en/docs/lightframe/manual' },
          { text: 'Custom Commands', link: '/en/docs/lightframe/code' }
        ]
      },
      {
        text: 'Pogget',
//        collapsed: true,
        items: [
          { text: 'Pogget', link: '/en/docs/pogget/index' },
          { text: 'Window Group', link: '/en/docs/pogget/group' },
          { text: 'Mapped Storage and Regular Storage', link: '/en/docs/pogget/mapping' },
          { text: 'Cache folder', link: '/en/docs/pogget/roaming' },
          { text: 'Magnet Window', link: '/en/docs/pogget/mag' }

        ]
      },
      {
        text: 'Vui.Parser',
//        collapsed: true,
        items: [
          { text: 'Basic Introduction', link: '/en/docs/vui.parser/index' }
        ]
      },
      {
        text: 'Vina.UI',
//        collapsed: true,
        items: [
          { text: 'Basic Introduction', link: '/en/docs/vinaui/index' }
        ]
      },
      {
        text: 'Synap',
//        collapsed: true,
        items: [
          { text: 'Basic Introduction', link: '/en/docs/synap/index' }
        ]
      },
      {
        text: 'ABOUT',
//        collapsed: true,
        items: [
          { text: 'About Vilinko', link: '/en/about/index' },
        ]
      },
      {
        text: 'Service Agreement',
        items: [
          { text: 'Terms of Service', link: '/en/agreement/tos' },
          { text: 'Privacy Policy', link: '/en/agreement/privacy' },
          { text: 'Public Disclosure of Personal Information Collection', link: '/en/agreement/privacy_collect' },
          { text: 'Minor Protection Terms', link: '/en/agreement/protect_child' },
          { text: 'Paid Service Agreement', link: '/en/agreement/pay' },
          { text: 'Pogget Inspiration Hub Service Agreement', link: '/en/agreement/pogget-vui-service' },
          { text: 'Statement on User Right to Be Informed for Pogget', link: '/en/agreement/pogget-service' },
        ],
      },
    ];
  }
  
  // 默认中文侧边栏
  return [
//    {
//      text: 'Universe',
//      collapsed: true,
//      items: [
//        { text: '介绍', link: '/docs/universe/index' }
//      ]
//    },
    {
      text: 'LightFrame',
//      collapsed: true,
      items: [
        { text: '基本介绍', link: '/docs/lightframe/index' },
        { text: '使用教程', link: '/docs/lightframe/manual' },
        { text: '自定义命令', link: '/docs/lightframe/code' }
      ]
    },
    {
      text: 'Pogget',
//      collapsed: true,
      items: [
        { text: 'Pogget', link: '/docs/pogget/index' },
        { text: 'CustomVina 个性化预设', link: '/docs/pogget/custom-vina' },
        { text: '组件编组', link: '/docs/pogget/group' },
        { text: '映射收纳和普通收纳', link: '/docs/pogget/mapping' },
        { text: '缓存文件夹', link: '/docs/pogget/roaming' },
        { text: '磁力窗', link: '/docs/pogget/mag' }
      ]
    },
    {
      text: 'Vui.Parser',
//      collapsed: true,
      items: [
        { text: '基本介绍', link: '/docs/vui.parser/index' }
      ]
    },
    {
      text: 'Vina.UI',
//      collapsed: true,
      items: [
        { text: '基本介绍', link: '/docs/vinaui/index' }
      ]
    },
    {
      text: 'Synap',
//      collapsed: true,
      items: [
        { text: '基本介绍', link: '/docs/synap/index' }
      ]
    },
    {
      text: '关于',
//      collapsed: true,
      items: [
        { text: '关于 Vilinko', link: '/about/index' },
      ]
    },
    {
      text: '服务协议',
      items: [
        { text: '服务条款', link: '/agreement/tos' },
        { text: '隐私政策', link: '/agreement/privacy' },
        { text: '隐私信息收集内容公示', link: '/agreement/privacy_collect' },
        { text: '未成年人保护条款', link: '/agreement/protect_child' },
        { text: '付费服务协议', link: '/agreement/pay' },
        { text: '灵感小站服务协议', link: '/agreement/pogget-vui-service' },
        { text: '关于 Pogget 用户知情权的说明', link: '/agreement/pogget-service' },
      ]
    },
  ];
}

export default withMermaid(
  defineConfig({
    base: "",
    title: "Vilinko Docs",
    description: "Vilinko Studio 文档，提供产品的使用说明和用户服务支持。",
    keywords: 'Vilinko Studio,文档,产品,服务,支持,Vilinko,vertillusion,lightframe,lfs,vinaui,vui,pogget,POGGET,LIGHTFRAME',
    head: [
      ['link', { rel: 'icon', type: 'image/png', href: 'https://www.vilinko.com/img/Newico.png' }]
    ],
    
    // 多语言配置
    locales: {
      root: {
        label: '简体中文',
        lang: 'zh-CN',
        themeConfig: {
          lang: 'zh-Hans',
          externalLinkIcon: true,
          langMenuLabel: '切换语言',
          darkModeSwitchLabel: '主题',
          lightModeSwitchTitle: '切换到浅色模式',
          darkModeSwitchTitle: '切换到深色模式',
          sidebarMenuLabel: '菜单',
          outline: { level: [2, 3], label: '目录' },
          returnToTopLabel: '返回顶部',
          docFooter: { prev: '上一篇', next: '下一篇' },
          
          // 导航和侧边栏
          nav: createNav('zh'),
          sidebar: createSidebar('zh'),
        }
      },
      en: {
        label: 'English',
        lang: 'en-US',
        themeConfig: {
          lang: 'en-US',
          externalLinkIcon: true,
          langMenuLabel: 'Switch Language',
          darkModeSwitchLabel: 'Theme',
          lightModeSwitchTitle: 'Switch to Light Mode',
          darkModeSwitchTitle: 'Switch to Dark Mode',
          sidebarMenuLabel: 'Menu',
          outline: { level: [2, 3], label: 'Outline' },
          returnToTopLabel: 'Back to Top',
          docFooter: { prev: 'Previous', next: 'Next' },
          
          // 导航和侧边栏
          nav: createNav('en'),
          sidebar: createSidebar('en'),
        }
      },
    },
    
    mermaid: {},
    mermaidPlugin: {
      class: "mermaid my-class",
    },
    
    markdown: {
      config: (md) => {
        // 临时禁用 task-checkbox 插件以避免构建错误
        console.log('Markdown config loaded');
      },
    },
    
    vite: {
      server: {
        proxy: {
          '/api': {
            target: 'https://api.vilinko.com',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''),
          },
        },
      },
      // 新增：构建时添加时间戳配置
      build: {
        // 使用默认构建配置避免临时文件问题
        rollupOptions: {
          output: {
            manualChunks: undefined
          }
        }
      },
      plugins: [
        vitepressProtectPlugin({
          disableF12: true, // 禁用 F12 开发者模式
          disableCopy: false, // 文本复制
          disableSelect: false, // 文本选择
        }),
      ],
    },
    
    themeConfig: {
      
      // 搜索框
      search: {
        provider: "algolia",
        options: {
          appId: 'VAKACNQ21Y',
          apiKey: '965927943f88caaf27f36e4fa088c353',
          indexName: 'Vilinko docs',
          placeholder: '搜索文档...',
          translations: {
            button: {
              buttonText: "搜索",
              buttonAriaLabel: "搜索"
            },
            modal: {
              searchBox: {
                resetButtonTitle: "清除查询条件",
                resetButtonAriaLabel: "清除查询条件",
                cancelButtonText: "取消",
                cancelButtonAriaLabel: "取消"
              },
              startScreen: {
                recentSearchesTitle: "最近搜索",
                noRecentSearchesText: "没有最近搜索记录",
                saveRecentSearchButtonTitle: "保存此搜索",
                removeRecentSearchButtonTitle: "从历史记录中删除此搜索",
                favoriteSearchesTitle: "收藏",
                removeFavoriteSearchButtonTitle: "从收藏中删除"
              },
              errorScreen: {
                titleText: "无法获取结果",
                helpText: "您可能需要检查网络连接"
              },
              footer: {
                selectText: "选择",
                navigateText: "导航",
                closeText: "关闭",
                searchByText: "搜索提供者"
              },
              noResultsScreen: {
                noResultsText: "没有找到相关结果",
                suggestedQueryText: "试试搜索",
                reportMissingResultsText: "相信这个查询应该返回结果？",
                reportMissingResultsLinkText: "告诉我们"
              }
            }
          }
        }
      },

      // 页脚
      footer: {
        copyright: 'Copyright © 2019 - 2026 Vilinko Studio. All Rights Reserved.',
        message: '<a href="https://beian.miit.gov.cn/" target="_blank" style="text-decoration: none;">粤ICP备2025454076号</a>'
      },

      // 社交链接
      socialLinks: [
        { icon: 'github', link: 'https://github.com/VilinkoStudio' },
        { icon: 'bilibili', link: 'https://space.bilibili.com/3493298551393123' },
        { icon: 'qq', link: 'https://pd.qq.com/g/csm3ip9s49'}
      ]
    },
  })
);
