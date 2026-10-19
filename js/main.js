/*
 * BypassBroker website — the small amount of behaviour the pages need.
 * No framework, no build step. Every page loads this one file.
 */

/**
 * Store links. Set a URL to `null` until the app is live on that store; its
 * buttons then point at the download section and read "Coming soon".
 */
const STORE_LINKS = {
  android: 'https://play.google.com/store/apps/details?id=com.bypassbroker.app',
  ios: null, // e.g. 'https://apps.apple.com/in/app/bypassbroker/id0000000000'
}

document.documentElement.classList.remove('no-js')

// ------------------------------------------------------------ store buttons
document.querySelectorAll('[data-store]').forEach(btn => {
  const url = STORE_LINKS[btn.dataset.store]
  if (url) {
    btn.href = url
    btn.target = '_blank'
    btn.rel = 'noopener'
  } else {
    const label = btn.querySelector('small')
    if (label) label.textContent = 'COMING SOON TO'
    btn.setAttribute('aria-disabled', 'true')
    btn.removeAttribute('href')
  }
})

// ------------------------------------------------------------ header
const header = document.querySelector('.site-header')
const onScroll = () => header && header.classList.toggle('is-scrolled', window.scrollY > 8)
window.addEventListener('scroll', onScroll, { passive: true })
onScroll()

const toggle = document.querySelector('.nav-toggle')
const links = document.getElementById('nav-links')
if (toggle && links) {
  const setOpen = open => {
    links.classList.toggle('is-open', open)
    toggle.setAttribute('aria-expanded', String(open))
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu')
  }
  toggle.addEventListener('click', () => setOpen(!links.classList.contains('is-open')))
  links.addEventListener('click', e => { if (e.target.closest('a')) setOpen(false) })
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false) })
}

// ------------------------------------------------------------ tabs (how it works)
const tabs = Array.from(document.querySelectorAll('[role="tab"]'))
const selectTab = tab => {
  tabs.forEach(t => {
    const selected = t === tab
    t.setAttribute('aria-selected', String(selected))
    t.tabIndex = selected ? 0 : -1
    document.getElementById(t.getAttribute('aria-controls')).hidden = !selected
  })
}
tabs.forEach((tab, i) => {
  tab.addEventListener('click', () => selectTab(tab))
  tab.addEventListener('keydown', e => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    const next = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length]
    selectTab(next)
    next.focus()
  })
})

// ------------------------------------------------------------ screenshot gallery
const gallery = document.getElementById('gallery')
document.querySelectorAll('[data-gallery]').forEach(btn => {
  btn.addEventListener('click', () => {
    if (!gallery) return
    gallery.scrollBy({ left: Number(btn.dataset.gallery) * gallery.clientWidth * 0.8, behavior: 'smooth' })
  })
})

// ------------------------------------------------------------ reveal on scroll
const revealables = document.querySelectorAll('.reveal')
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return
      entry.target.classList.add('is-visible')
      observer.unobserve(entry.target)
    })
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 })
  revealables.forEach(el => observer.observe(el))
} else {
  revealables.forEach(el => el.classList.add('is-visible'))
}

// ------------------------------------------------------------ footer year
document.querySelectorAll('[data-year]').forEach(el => { el.textContent = String(new Date().getFullYear()) })
