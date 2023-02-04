import YAML from 'js-yaml'

function toReactive(input: Record<any, any> | (() => Record<any, any>), omit: string[] = []) {
  let res = typeof input === 'function' ? input() : input
  res = Object.keys(res).reduce<Record<any, any>>((acc, key) => {
    if (omit.includes(key)) return acc
    acc[key] = typeof input[key] === 'function' ? input[key]() : input[key]
    return acc
  }, {})
  return res
}

export const stringify = (input: Record<any, any> | (() => Record<any, any>) = {}, omit: string[] = []) =>
  YAML.dump(toReactive(input, omit), {
    skipInvalid: true,
    forceQuotes: true,
    condenseFlow: true,
    noCompatMode: true,
    quotingType: "'"
  })

export function kebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase()
}

export function renderMarkdown(markdownText = '') {
  const htmlText = markdownText
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
    .replace(/\*\*(.*)\*\*/gim, '<b>$1</b>')
    .replace(/\*(.*)\*/gim, '<i>$1</i>')
    .replace(/!\[(.*?)\]\((.*?)\)/gim, "<img alt='$1' src='$2' />")
    .replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2'>$1</a>")
    .replace(/`(.*?)`/gim, '<code>$1</code>')
    .replace(/\n$/gim, '<br />')

  return htmlText.trim()
}

export function renderCommitMessage(msg: string) {
  return renderMarkdown(msg).replace(
    /#([0-9]+)/g,
    "<a href='https://github.com/solidjs-use/solidjs-use/issues/$1'>#$1</a>"
  )
}
