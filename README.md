# `qtw`

> Qt + Tailwind for Node GUI

If you're using a Javascript based Qt environment such as [Node GUI](https://docs.nodegui.org/), you'll maybe want to use the best CSS tool you know AKA Tailwind.

Qt styling works with a syntax close to CSS, but it's _not_ actual CSS. That means Tailwind won't work out of the box with it.

`qtw` is a small tool that imitates how Tailwind works, but stays fully compatible with Qt.

An example with React Node GUI :

```typescript
import { View, Text, Button } from "@nodegui/react-nodegui";
import { qtw } from "qtw";

export default function Demo() {
	return (
		<View
			style={qtw(
				"bg-sky-200 text-blue-800 border-2 border-blue-800 rounded-xl p-5 flex-col"
			)}
		>
			<Text style={qtw("text-lg")}>Hello, World!</Text>
			<Button
				style={qtw("mt-auto py-2 px-3 bg-white text-sky-500 rounded-md")}
				text="Close"
			/>
		</View>
	);
}
```

This is equivalent to writing :

```typescript
import { View, Text, Button } from "@nodegui/react-nodegui";

export default function Demo() {
	return (
		<View
			style={`
        border-color: #bae6fd;
        color: #1e40af;
        border-width: 2px;
        border-color: #1e40af;
        border-radius: 12px;
        padding: 20px;
        flex-direction: column;
      `}
		>
			<Text style={"font-size: 18px"}>Hello, World!</Text>
			<Button
				style={`
          margin-top: 'auto';
          padding-top: 8px;
          padding-bottom: 8px;
          padding-left: 12px;
          padding-left: 12px;
          color: #0ea5e9;
          border-radius: 6px;
        `}
				text="Close"
			/>
		</View>
	);
}
```

## Disclaimer

This is _not_ a full working Tailwind. Implementing the entire Tailwind system is impossible since Qt does not use proper CSS.  
`qtw` is only a way to save you time by recreating a system you already know.

## Usage

`qtw` is "type-safe" when used with Typescript, meaning that you cannot write a wrong class inside the `qtw` function.

You can also add custom styles by simply passing another parameter.

```typescript
tw("bg-color-wrong"); // won't compile with Typescript
tw("mt-5 mb-auto", "border-radius: 333px"); // Will join margins and border radius
```

You can use the `createQtwWithTheme()` function to provide a custom theme (like you would in `tailwind.config.js`)

```typescript
import { createQtwWithTheme, defaultTheme } from "qtw";

const customQtw = createQtwWithTheme({
	...defaultTheme,
	colors: {
		...defaultTheme.colors,
		link: "#0044DD",
		primary: {
			"100": "#ede0d4",
			"200": "#e6ccb2",
			"300": "#ddb892",
			"400": "#b08968",
			"500": "#9c6644",
			"600": "#7f5539",
		},
	},
});

customQtw("text-link"); // color: #0044DD"
customQtw("bg-primary-100 border-primary-500"); // background-color: #ede0d4; border-color: #9c6644
```
