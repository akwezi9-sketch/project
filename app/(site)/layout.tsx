import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Reveal from '@/components/Reveal'
import { getSettings } from '@/lib/content'

export const revalidate = 60

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings()
  return (
    <>
      <div className="grain" aria-hidden="true"></div>
      <Header settings={settings} />
      <main>{children}</main>
      <Footer settings={settings} />
      <Reveal />
    </>
  )
}
