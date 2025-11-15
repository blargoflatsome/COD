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
        root: 'lg:fixed lg:top-0 lg:right-20 z-10 bg-default/75 lg:bg-[initial] backdrop-blur -mx-4 px-4 sm:px-6 sm:-mx-6 overflow-y-auto max-h-[calc(100vh-var(--ui-header-height))]',
        title: 'text-white lg:hidden',
       },
    },
    main: {
      base: 'bg-default min-h-[calc(100vh-var(--ui-header-height))]'
    },
  }
})
