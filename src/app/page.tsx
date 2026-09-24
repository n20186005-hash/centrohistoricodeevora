import { redirect } from 'next/navigation';

// 在 standalone（Cloudflare Workers）部署下，`/` 由中间件判定语言后重定向；
// 该页面作为兜底，在服务端将未匹配语言的 `/` 请求重定向到默认语言 `/pt`。
export default function RootPage() {
  redirect('/pt');
}