export default defineAppConfig({
  ui: {
    colors: {
      primary: 'kambista',
      neutral: 'slate',
    },
    formField: {
      slots: {
        label: 'text-slate-800',
      },
    },
    input: {
      slots: {
        base: 'h-10 rounded-sm bg-white px-4 text-base text-slate-950 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-primary-500',
        leadingIcon: 'text-slate-500',
        trailingIcon: 'text-slate-500',
      },
    },
  },
})
