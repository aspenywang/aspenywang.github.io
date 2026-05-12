import { useEffect, useMemo, useState } from 'react'

import portraitUrl from './assets/portrait.jpg'
import resumeUrl from './assets/cv.pdf'
import { experiences, publications, teaching } from './data/experiences'

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Notes', path: '/notes' },
]

function getRouteFromHash() {
  const hash = window.location.hash.replace(/^#/, '')
  return navItems.some((item) => item.path === hash) ? hash : '/'
}

function App() {
  const [route, setRoute] = useState(getRouteFromHash)
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) return savedTheme
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    const handleHashChange = () => setRoute(getRouteFromHash())
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  const Page = useMemo(() => {
    if (route === '/notes') return Notes
    return Home
  }, [route])

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="site-name" href="#/">
          Aspen Wang
        </a>

        <nav className="site-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a
              aria-current={route === item.path ? 'page' : undefined}
              href={`#${item.path}`}
              key={item.path}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          className="theme-toggle"
          onClick={() => setTheme((value) => (value === 'dark' ? 'light' : 'dark'))}
          type="button"
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>
      </header>

      <main className="site-main">
        <Page />
      </main>
    </div>
  )
}

function Home() {
  return (
    <section className="home-layout">
      <aside className="profile-panel">
        <img className="portrait" src={portraitUrl} alt="Aspen Wang" />
        <div className="profile-links" aria-label="Contact and profile links">
          <IconLink href={resumeUrl} label="CV">
            CV
          </IconLink>
          <IconLink href="https://github.com/aspenywang" label="GitHub">
            <GitHubIcon />
          </IconLink>
          <IconLink href="https://twitter.com/aspenywang" label="Twitter">
            <TwitterIcon />
          </IconLink>
          <IconLink href="https://www.linkedin.com/in/aspenywang/" label="LinkedIn">
            <LinkedInIcon />
          </IconLink>
        </div>
      </aside>

      <div className="home-content">
        <section className="intro-section" aria-labelledby="intro-heading">
          <h1 id="intro-heading">hi, i'm aspen.</h1>
          <p className="lede">
            Computer Science Senior at Vassar College with a minor in Statistics.<br />
            My research
            interests are broadly in reliable and trustworthy AI/ML, AI agents, and
            human-centered AI.
          </p>
          <p className="lede">
            Outside of research, I enjoy gaming, traveling, literature, and design.
          </p>
        </section>

        <ExperienceSection />
        <TeachingSection />
        <PublicationSection />
      </div>
    </section>
  )
}

function IconLink({ children, href, label }) {
  const isExternal = href.startsWith('http')

  return (
    <a
      aria-label={label}
      className="icon-link"
      href={href}
      rel={isExternal ? 'noreferrer' : undefined}
      target={isExternal ? '_blank' : undefined}
      title={label}
    >
      {children}
    </a>
  )
}

function GitHubIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M12 2.5a9.7 9.7 0 0 0-3.1 18.9c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.6 1.1 1.6 1.1.9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.7-1.4-2.3-.3-4.7-1.1-4.7-5A3.9 3.9 0 0 1 6.8 8.8c-.1-.3-.5-1.3.1-2.7 0 0 .9-.3 2.8 1a9.5 9.5 0 0 1 5.1 0c1.9-1.3 2.8-1 2.8-1 .6 1.4.2 2.4.1 2.7a3.9 3.9 0 0 1 1 2.7c0 3.9-2.4 4.7-4.7 5 .4.3.7.9.7 1.8v2.6c0 .3.2.6.7.5A9.7 9.7 0 0 0 12 2.5Z" />
    </svg>
  )
}

function TwitterIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M21.5 6.1c-.7.3-1.4.5-2.2.6.8-.5 1.4-1.2 1.7-2.1-.7.4-1.5.8-2.4.9a3.8 3.8 0 0 0-6.5 3.5A10.8 10.8 0 0 1 4.3 5a3.8 3.8 0 0 0 1.2 5.1c-.6 0-1.2-.2-1.7-.5v.1a3.8 3.8 0 0 0 3 3.7c-.3.1-.7.1-1 .1-.2 0-.5 0-.7-.1a3.8 3.8 0 0 0 3.5 2.6A7.6 7.6 0 0 1 3.9 18c-.3 0-.6 0-.9-.1a10.7 10.7 0 0 0 5.8 1.7c7 0 10.8-5.8 10.8-10.8v-.5c.7-.5 1.4-1.2 1.9-2.2Z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M5.3 8.8h3.1v9.9H5.3V8.8Zm1.6-4.9a1.8 1.8 0 1 1 0 3.6 1.8 1.8 0 0 1 0-3.6Zm3.5 4.9h3v1.4h.1c.4-.8 1.4-1.7 3-1.7 3.2 0 3.8 2.1 3.8 4.8v5.4h-3.1v-4.8c0-1.2 0-2.7-1.6-2.7s-1.9 1.3-1.9 2.6v4.9h-3.1V8.8Z" />
    </svg>
  )
}

function SunIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M12 5.8A6.2 6.2 0 1 0 12 18.2 6.2 6.2 0 0 0 12 5.8Zm0 10.5A4.3 4.3 0 1 1 12 7.7a4.3 4.3 0 0 1 0 8.6ZM12 2.5c.5 0 .9.4.9.9v1c0 .5-.4.9-.9.9s-.9-.4-.9-.9v-1c0-.5.4-.9.9-.9Zm0 16.2c.5 0 .9.4.9.9v1c0 .5-.4.9-.9.9s-.9-.4-.9-.9v-1c0-.5.4-.9.9-.9ZM4.3 4.3c.3-.3.9-.3 1.2 0l.7.7c.3.3.3.9 0 1.2s-.9.3-1.2 0l-.7-.7a.8.8 0 0 1 0-1.2Zm13.5 13.5c.3-.3.9-.3 1.2 0l.7.7c.3.3.3.9 0 1.2s-.9.3-1.2 0l-.7-.7a.8.8 0 0 1 0-1.2ZM2.5 12c0-.5.4-.9.9-.9h1c.5 0 .9.4.9.9s-.4.9-.9.9h-1c-.5 0-.9-.4-.9-.9Zm16.2 0c0-.5.4-.9.9-.9h1c.5 0 .9.4.9.9s-.4.9-.9.9h-1c-.5 0-.9-.4-.9-.9ZM4.3 19.7a.8.8 0 0 1 0-1.2l.7-.7c.3-.3.9-.3 1.2 0s.3.9 0 1.2l-.7.7c-.3.3-.9.3-1.2 0ZM17.8 6.2a.8.8 0 0 1 0-1.2l.7-.7c.3-.3.9-.3 1.2 0s.3.9 0 1.2l-.7.7c-.3.3-.9.3-1.2 0Z" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M20.9 15.1a.9.9 0 0 1 .2 1A9.8 9.8 0 1 1 8.2 3.2a.9.9 0 0 1 1 1.2 7.7 7.7 0 0 0 10.5 10.5.9.9 0 0 1 1.2.2Z" />
    </svg>
  )
}

function ExperienceSection() {
  return (
    <section className="content-section" aria-labelledby="experience-heading">
      <h2 id="experience-heading">experience</h2>
      <ul className="entry-list">
        {experiences.map((experience) => (
          <li className="entry-item" key={experience.title}>
            <details>
              <summary>
                <span className="summary-content">
                  <strong>
                    <FormattedTitle title={experience.title} />
                  </strong>
                  <span className="summary-description">{experience.description}</span>
                </span>
              </summary>
              <p>{experience.details}</p>
              <TagLine tags={experience.tags} />
            </details>
          </li>
        ))}
      </ul>
    </section>
  )
}

function TeachingSection() {
  return (
    <section className="content-section" aria-labelledby="teaching-heading">
      <h2 id="teaching-heading">teaching</h2>
      <ul className="entry-list">
        {teaching.map((item) => (
          <li className="entry-item" key={item.title}>
            <details>
              <summary>
                <span className="summary-content">
                  <strong>
                    <FormattedTitle title={item.title} />
                  </strong>
                </span>
              </summary>
              <ul className="course-list">
                {item.courses.map((course) => (
                  <li key={course}>{course}</li>
                ))}
              </ul>
            </details>
          </li>
        ))}
      </ul>
    </section>
  )
}

function PublicationSection() {
  return (
    <section className="content-section" aria-labelledby="publication-heading">
      <h2 id="publication-heading">publication</h2>
      <ul className="entry-list">
        {publications.map((publication) => (
          <li className="entry-item" key={publication.title}>
            <details>
              <summary>
                <span className="summary-content">
                  <strong>{publication.title}</strong>
                  <span className="summary-description">{publication.venue}</span>
                </span>
              </summary>
              <p>{publication.details}</p>
            </details>
          </li>
        ))}
      </ul>
    </section>
  )
}

function FormattedTitle({ title }) {
  const [name, place] = title.split(' @ ')

  if (!place) {
    return title
  }

  return (
    <>
      {name}
      <span className="title-place"> @ {place}</span>
    </>
  )
}

function TagLine({ tags }) {
  if (!tags?.length) {
    return null
  }

  return <p className="tag-line">{tags.join(' / ')}</p>
}

function Notes() {
  return (
    <section className="page prose-page">
      <h1>notes.</h1>
      <p>Notes coming soon.</p>
    </section>
  )
}

export default App
