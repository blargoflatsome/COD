export default defineAppConfig({
  ui: {
    colors: {
			primary: 'slatePrimary',
			secondary: 'slateSecondary',
			success: 'slateSuccess',
			info: 'slateInfo',
			warning: 'slateWarning',
			error: 'slateError',
			neutral: 'slateNeutral'
		},
    header: {
      slots: {
        root: 'bg-transparent backdrop-blur border-b border-default h-(--ui-header-height) sticky top-0 z-50',
        toggle: 'text-white hover:text-black lg:block',
        content: 'lg:block',
        overlay: 'lg:block',
        title: 'shrink-0 font-bold text-xl text-white flex items-end gap-1.5',
      },
    },
    contentToc: {
      slots: {
        title: 'text-white lg:hidden',
       },
    }
  }
})
