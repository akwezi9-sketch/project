import type { Metadata } from 'next'
import { Big_Shoulders, Archivo, Instrument_Serif } from 'next/font/google'
import './globals.css'

// "Big Shoulders" is the variable successor of Big Shoulders Display on Google Fonts;
// the opsz axis is loaded so headlines render at the display optical size.
const disp = Big_Shoulders({ subsets: ['latin'], weight: 'variable', axes: ['opsz'], variable: '--font-disp', fallback: ['sans-serif'] })
const body = Archivo({ subsets: ['latin'], weight: ['400', '500', '600'], style: ['normal', 'italic'], variable: '--font-body' })
const serif = Instrument_Serif({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], variable: '--font-serif' })

export const metadata: Metadata = {
  title: { default: 'World of GA — Photographer & Filmmaker', template: '%s | World of GA' },
  description: 'Godwin Antiedu (GA) is a photographer and filmmaker shooting studio portraits, sports, music, brands and corporate events.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${disp.variable} ${body.variable} ${serif.variable}`} id="top">
      <body>{children}</body>
    </html>
  )
}
