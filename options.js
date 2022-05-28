/* global fetch */
document.getElementById('getGroupName').addEventListener('click', getGroupName)
document.getElementById('linkScraper').addEventListener('click', linkScraper)
document.getElementById('copy').addEventListener('click', copy)
document.getElementById('clean').addEventListener('click', clean)

/**
 * @description HTML实体还原
 * @param {string} str - 内容
 * @returns {string} 转换后的字符
 */
function htmlEntitiesDecode (str) {
  return str.replace(/&#(\d+);/g, function (match, dec) {
    return String.fromCharCode(dec)
  })
}

/**
 * @description HTML转义还原
 * @param {string} str - 内容
 * @returns {string} 转换后的字符
 */
function htmlUnescape (str) {
  str = str.replace(/&#123;/g, '{')
  str = str.replace(/&#125;/g, '}')
  str = str.replace(/&quot;/g, '"')
  str = str.replace(/&amp;/g, '&')
  str = str.replace(/&lt;/g, '<')
  str = str.replace(/&gt;/g, '>')
  str = str.replace(/&#10;/g, '\n')
  return str
}

/**
 * @description 数组排除重复
 * @param {Array} data - 数组链接
 * @returns {Array} 不重复的链接
 */
function unique (data) {
  return Array.from(new Set(data))
}

// 获取小组名称
async function getGroupName () {
  const input = document.getElementById('input').value.match(/.+/g)
  const output = document.getElementById('output')
  const status = document.getElementById('status')
  status.style.display = 'block'
  output.value = ''
  let index = 0
  for (const url of input) {
    index++
    status.innerText = `${index}/${input.length}`
    const text = await fetch(url).then(response => response.text())
    const title = text.match(/(?<=<h3 class="_9vd5 _9scr".*?>).*?(?=<\/h3>)/g)[0].replace(/\n|\t|^&quot;/g, '')
    let image
    try {
      image = text.match(/(?<=class="_9vx7 _9vx6" src=").*?(?=")/g)[0].replace(/amp;/g, '')
    } catch {
      image = ''
    }
    output.value += `=IMAGE("${image}")\t${htmlUnescape(htmlEntitiesDecode(title))}\n`
  }
  status.innerText = '完成'
}

// 抓取链接
async function linkScraper () {
  const input = document.getElementById('input').value.match(/.+/g)
  const output = document.getElementById('output')
  const status = document.getElementById('status')
  status.style.display = 'block'
  output.value = ''
  let index = 0
  for (const url of input) {
    index++
    const text = await fetch(url).then(response => response.text())
    status.innerText = `${index}/${input.length}`
    const getHtml = text.replace(/invite\//g, '').replace(/%3A/g, ':').replace(/%2F/g, '/')
    const getHtml1 = getHtml.replace(/<.*?>/g, '')
    const WhatsAppLink = (getHtml + getHtml1).match(/https:\/\/chat\.whatsapp.com\/[A-z0-9]{22}/g)
    const groupLink = unique(WhatsAppLink)
    let str = ''
    for (let i = 0; i < groupLink.length; i++) {
      str += `${groupLink[i]}\n`
    }
    output.value += str
  }
  status.innerText = '完成'
}

// 复制
function copy () {
  const status = document.getElementById('status')
  status.style.display = 'none'
  const el = document.getElementById('output')
  el.select()
  document.execCommand('copy')
}

// 清空
function clean () {
  const status = document.getElementById('status')
  status.style.display = 'none'
  document.getElementById('input').value = ''
  document.getElementById('output').value = ''
}
