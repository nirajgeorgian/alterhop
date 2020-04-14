declare const process: any
declare const require: any

declare interface Window {
	__REDUX_DEVTOOLS_EXTENSION__: any
	__REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
}

declare interface NodeModule {
	hot?: { accept: (path: string, callback: () => void) => void }
}

declare interface System {
	import<T = any>(module: string): Promise<T>
}

declare let System: System

declare module '*.module.less' {
	const classes: { [key: string]: string }
	export default classes
}

declare module '*.less' {
	interface IClassNames {
		[className: string]: string
	}
	const classNames: IClassNames
	export = classNames
}

declare module '*.svg' {
	const content: string

	export default content
}
