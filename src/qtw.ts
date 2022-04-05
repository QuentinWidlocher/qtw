import { defaultTheme, QtwTheme } from "./theme";

// Generate a set of CSS rules for each variant in the theme
function computeVariants<
	ThemeValues extends Record<string, string>,
	Sizes extends keyof ThemeValues & string,
	Prefix extends string
>(
	prefix: Prefix, // The class prefix, such as mt, py or border
	themeValues: ThemeValues, // The objet containing the values, such as { "1": "4px" }
	properties: string[] // The css properties to apply, such as "margin-top" or "border-width"
): { [key in `${Prefix}-${Sizes}`]: string } {
	// Here we iterate over the values and create a set of css rules
	return Object.keys(themeValues).reduce((acc, key) => {
		// The rule is made of the prefix and the value key (e.g. mt-1)
		// We map over the properties to create multiple rules linked to one class
		// e.g. "my-1" => "margin-top: 4px;margin-bottom: 4px"
		acc[`${prefix}-${key}`] = properties
			.map((p) => `${p}: ${themeValues[key]}`)
			.join("; ");
		return acc;
	}, {} as ReturnType<typeof computeVariants>);
}

// A color class can be either a color name or a color name with a variant
// Each color need a prefix
// e.g. "bg-white" or "text-blue-500"
type ColorClass<
	Prefix extends string,
	Colors extends {
		[key in string]: string | { readonly [key: string]: string };
	}
	// Here we create an object with the color name as key and the value as the variant(s)
> = {
	readonly [Color in keyof Colors & string]: Colors[Color] extends {
		readonly [key: string]: string;
	}
		? `${Prefix}-${Color}-${keyof Colors[Color] & string}` // Multiple variants (usually 50 to 900)
		: `${Prefix}-${Color}`; // Unique variant (e.g. white)
}[keyof Colors & string]; // We only need the values of this object, the keys are not used

// Generate a set of CSS rules for each color in the theme, with a single or multiple variants
function computeColors<
	// The value can contain one or multiple variants
	ThemeValues extends Record<string, string | Record<string, string>>,
	Colors extends keyof ThemeValues & string,
	Prefix extends string
>(
	prefix: Prefix, // The class prefix, such as bg, text or border
	themeValues: ThemeValues, // The object containing the values, such as { "white": "#fff", "blue": { "500": "#3f51b5" } }
	property: string // The css property to apply, such as "background-color" or "color"
): {
	[key in ColorClass<Prefix, ThemeValues>]: string;
} {
	// We iterate over the values and create a set of css rules
	return Object.keys(themeValues).reduce((acc, key) => {
		if (typeof themeValues[key] === "string") {
			// If the color has only one variant...
			const color = themeValues[key] as string;

			// We create a rule with the prefix and the color name
			acc[`${prefix}-${key as Colors}`] = `${property}: ${color}`;
		} else if (typeof themeValues[key] === "object") {
			// If the color has multiple variants...
			const color = themeValues[key] as Record<string, string>;

			// We create one class for each variant
			for (const variant in color) {
				acc[
					`${prefix}-${key as Colors}-${variant}`
				] = `${property}: ${color[variant]}`;
			}
		}
		return acc;
	}, {} as ReturnType<typeof computeColors>);
}

// Extract an theme object from a theme configuration
function getClassesFromTheme<UsedTheme extends QtwTheme>(theme: UsedTheme) {
	// Using `as UsedTheme["something"]` helps Typescript knows it has to look
	// up the theme for the keys, instead of using `string`
	return {
		...computeVariants("m", theme.spacing as UsedTheme["spacing"], ["margin"]),
		...computeVariants("mt", theme.spacing as UsedTheme["spacing"], [
			"margin-top",
		]),
		...computeVariants("mr", theme.spacing as UsedTheme["spacing"], [
			"margin-right",
		]),
		...computeVariants("mb", theme.spacing as UsedTheme["spacing"], [
			"margin-bottom",
		]),
		...computeVariants("ml", theme.spacing as UsedTheme["spacing"], [
			"margin-left",
		]),
		...computeVariants("mx", theme.spacing as UsedTheme["spacing"], [
			"margin-left",
			"margin-right",
		]),
		...computeVariants("my", theme.spacing as UsedTheme["spacing"], [
			"margin-top",
			"margin-bottom",
		]),

		...computeVariants("p", theme.spacing as UsedTheme["spacing"], ["padding"]),
		...computeVariants("pt", theme.spacing as UsedTheme["spacing"], [
			"padding-top",
		]),
		...computeVariants("pr", theme.spacing as UsedTheme["spacing"], [
			"padding-right",
		]),
		...computeVariants("pb", theme.spacing as UsedTheme["spacing"], [
			"padding-bottom",
		]),
		...computeVariants("pl", theme.spacing as UsedTheme["spacing"], [
			"padding-left",
		]),
		...computeVariants("px", theme.spacing as UsedTheme["spacing"], [
			"padding-left",
			"padding-right",
		]),
		...computeVariants("py", theme.spacing as UsedTheme["spacing"], [
			"padding-top",
			"padding-bottom",
		]),

		...computeVariants("flex", theme.flex as UsedTheme["flex"], ["flex"]),
		...computeVariants(
			"flex",
			theme.flexDirection as UsedTheme["flexDirection"],
			["flex-direction"]
		),
		...computeVariants("grow", theme.flex as UsedTheme["flex"], ["flex-grow"]),
		...computeVariants("shrink", theme.flex as UsedTheme["flex"], [
			"flex-shrink",
		]),

		...computeVariants("h", theme.spacing as UsedTheme["spacing"], ["height"]),
		...computeVariants("w", theme.spacing as UsedTheme["spacing"], ["width"]),

		...computeVariants("min-h", theme.spacing as UsedTheme["spacing"], [
			"min-height",
		]),
		...computeVariants("min-w", theme.spacing as UsedTheme["spacing"], [
			"min-width",
		]),
		...computeVariants("max-h", theme.spacing as UsedTheme["spacing"], [
			"max-height",
		]),
		...computeVariants("max-w", theme.spacing as UsedTheme["spacing"], [
			"max-width",
		]),

		...computeColors(
			"bg",
			theme.colors as UsedTheme["colors"],
			"background-color"
		),
		...computeColors(
			"border",
			theme.colors as UsedTheme["colors"],
			"border-color"
		),
		...computeColors("text", theme.colors as UsedTheme["colors"], "color"),
		...computeVariants(
			"border",
			theme.borderStyle as UsedTheme["borderStyle"],
			["border-style"]
		),
		...computeVariants(
			"border",
			theme.borderWidth as UsedTheme["borderWidth"],
			["border-width"]
		),
		...computeVariants(
			"rounded",
			theme.borderRadius as UsedTheme["borderRadius"],
			["border-radius"]
		),
		...computeVariants("text", theme.fontSize as UsedTheme["fontSize"], [
			"font-size",
		]),
	};
}

// This weird syntax is used to get a generic ReturnType of getClassesFromTheme
class Wrapper<UsedTheme extends QtwTheme> {
	getClassesFromTheme(theme: UsedTheme) {
		return getClassesFromTheme(theme);
	}
}

// This is a way of extracting the keys (the classes) from a theme object
// based on a specific theme
type ClassesFromTheme<UsedTheme extends QtwTheme> = keyof ReturnType<
	Wrapper<UsedTheme>["getClassesFromTheme"]
>;

// NestedClasses is a type that checks if a string is composed of multiple classes separated by a space
// prettier-ignore
type NestedClasses<
	T extends string,
	UsedTheme extends QtwTheme
> = T extends ClassesFromTheme<UsedTheme>
	? T // If the string is only one class, it's only one class
	: T extends `${ClassesFromTheme<UsedTheme>} ${infer R}` // We check if the string is a class, with another string separated by a space
		? T extends `${infer F} ${R}` // We "extract the rest of the string"
			? `${F} ${NestedClasses<R, UsedTheme>}` // And we try to type the rest of the string as a nested class
			: never
	: never;

export function createQtwWithTheme<UsedTheme extends QtwTheme>(
	customTheme: Partial<UsedTheme>
) {
	const theme = getClassesFromTheme({ ...defaultTheme, ...customTheme });

	function customQtw<Str extends string>(
		classes: NestedClasses<Str, UsedTheme>,
		...args: string[]
	): string {
		let styles = classes
			.split(" ")
			.map((c) => theme[c as keyof typeof theme] ?? null)
			// If the class is not found we return null so we can remove invalid classes
			.filter((c) => c != null)
			.join("; ");

		// We add the custom styles too
		if (args.length > 0) {
			styles += `; ${args.join("; ")}`;
		}

		return styles;
	}

	return customQtw;
}

export const qtw = createQtwWithTheme(defaultTheme);
export { defaultTheme, QtwTheme } from "./theme";

declare var module: any;
module.exports = {
	qtw,
	createQtwWithTheme,
	defaultTheme,
};
