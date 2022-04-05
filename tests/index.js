const { qtw, createQtwWithTheme, defaultTheme } = require('../dist/qtw.js')

function assert(actual, expected) {
  let valid = actual == expected
  if (!valid) {
    console.log(`Expected ${expected} but got ${actual}`)
  }
}

function baseAssertions(qtwFn) {
  assert(qtwFn('m-1'), 'margin: 4px')
  assert(qtwFn('m-1 p-1'), 'margin: 4px; padding: 4px')
  assert(qtwFn("wrong-class"), "")
  assert(qtwFn("m-1 wrong-class"), "margin: 4px")
  assert(qtwFn("m-1 wrong-class p-1"), "margin: 4px; padding: 4px")
  assert(qtwFn('my-1'), 'margin-top: 4px; margin-bottom: 4px')
  assert(qtwFn('my-1 px-1'), 'margin-top: 4px; margin-bottom: 4px; padding-left: 4px; padding-right: 4px')
}

baseAssertions(qtw)
baseAssertions(createQtwWithTheme(defaultTheme))
baseAssertions(createQtwWithTheme({}))

const customQtw = createQtwWithTheme({
  ...defaultTheme,
  colors: {
    'basic-color': '#ededed',
    'palette': {
      '50': defaultTheme.colors.white,
      '100': '#f5f5f5',
      '200': '#eeeeee',
    }
  }
})

baseAssertions(customQtw)
assert(customQtw('bg-basic-color'), 'background-color: #ededed')
assert(customQtw('bg-palette-50'), 'background-color: #fff')
assert(customQtw('bg-palette-100'), 'background-color: #f5f5f5')
assert(customQtw('bg-palette-200'), 'background-color: #eeeeee')
assert(customQtw('bg-red-500'), '')