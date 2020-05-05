/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './editor.less'

import { Button, Divider } from 'antd'
import { Editor, EditorState, RichUtils, getDefaultKeyBinding } from 'draft-js'

import React from 'react'
import { UploadOutlined } from '@ant-design/icons'

const { useState, useRef, useCallback } = React

const MessageEditor: React.FC = (props) => {
	const [editorState, setEditorState] = useState(EditorState.createEmpty())
	const editor = useRef<Editor>(null)

	const focus = () => {
		if (editor.current) {
			editor.current.focus()
		}
	}

	const handleKeyCommand = useCallback(
		(command, editorState) => {
			const newState = RichUtils.handleKeyCommand(editorState, command)
			if (newState) {
				setEditorState(newState)

				return 'handled'
			}

			return 'not-handled'
		},

		[editorState, setEditorState]
	)

	const mapKeyToEditorCommand = useCallback(
		(e) => {
			const newEditorState = RichUtils.onTab(e, editorState, 4)
			switch (e.keyCode) {
				case 9:
					if (newEditorState !== editorState) {
						setEditorState(newEditorState)
					}

					return null
			}

			return getDefaultKeyBinding(e)
		},
		[editorState, setEditorState]
	)

	// If the user changes block type before entering any text, we can
	// either style the placeholder or hide it. Let's just hide it now.
	let className = 'RichEditor-editor'
	const contentState = editorState.getCurrentContent()
	if (!contentState.hasText()) {
		if (contentState.getBlockMap().first().getType() !== 'unstyled') {
			className += ' RichEditor-hidePlaceholder'
		}
	}

	return (
		<div className="RichEditor-root">
			<BlockStyleControls
				editorState={editorState}
				onToggle={(blockType: any) => {
					const newState = RichUtils.toggleBlockType(editorState, blockType)
					setEditorState(newState)
				}}
			/>
			<InlineStyleControls
				editorState={editorState}
				onToggle={(inlineStyle: any) => {
					const newState = RichUtils.toggleInlineStyle(editorState, inlineStyle)
					setEditorState(newState)
				}}
			/>
			<div className={className} onClick={focus}>
				<Editor
					// blockStyleFn={getBlockStyle}
					customStyleMap={styleMap}
					editorState={editorState}
					handleKeyCommand={handleKeyCommand}
					keyBindingFn={mapKeyToEditorCommand}
					onChange={setEditorState}
					placeholder="Write Your message..."
					ref={editor}
					spellCheck={true}
				/>
			</div>
			<div className="footer">
				<Button>
					<UploadOutlined />
				</Button>
				<Divider type="vertical" />
				<Button>Send</Button>
			</div>
		</div>
	)
}

const styleMap = {
	CODE: {
		backgroundColor: 'rgba(0, 0, 0, 0.05)',
		fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
		fontSize: 16,
		padding: 2
	}
}

// const getBlockStyle = (block) => {
// 	switch (block.getType()) {
// 		case 'blockquote':
// 			return 'RichEditor-blockquote'
// 		default:
// 			return null
// 	}
// }

const StyleButton = ({ onToggle, active, label, style }) => {
	let className = 'RichEditor-styleButton'
	if (active) {
		className += ' RichEditor-activeButton'
	}

	return (
		<span
			className={className}
			onMouseDown={(e: React.MouseEvent) => {
				e.preventDefault()
				onToggle(style)
			}}>
			{label}
		</span>
	)
}

const BLOCK_TYPES = [
	{ label: 'H1', style: 'header-one' },
	{ label: 'H2', style: 'header-two' },
	{ label: 'H3', style: 'header-three' },
	{ label: 'H4', style: 'header-four' },
	{ label: 'H5', style: 'header-five' },
	{ label: 'H6', style: 'header-six' },
	{ label: 'Blockquote', style: 'blockquote' },
	{ label: 'UL', style: 'unordered-list-item' },
	{ label: 'OL', style: 'ordered-list-item' },
	{ label: 'Code Block', style: 'code-block' }
]

const BlockStyleControls = ({ editorState, onToggle }) => {
	const selection = editorState.getSelection()
	const blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType()

	return (
		<div className="RichEditor-controls">
			{BLOCK_TYPES.map((type: any) => (
				<StyleButton
					key={type.label}
					active={type.style === blockType}
					label={type.label}
					onToggle={onToggle}
					style={type.style}
				/>
			))}
		</div>
	)
}

const INLINE_STYLES = [
	{ label: 'Bold', style: 'BOLD' },
	{ label: 'Italic', style: 'ITALIC' },
	{ label: 'Underline', style: 'UNDERLINE' },
	{ label: 'Monospace', style: 'CODE' }
]

const InlineStyleControls = ({ editorState, onToggle }) => {
	const currentStyle = editorState.getCurrentInlineStyle()

	return (
		<div className="RichEditor-controls">
			{INLINE_STYLES.map((type: any) => (
				<StyleButton
					key={type.label}
					active={currentStyle.has(type.style)}
					label={type.label}
					onToggle={onToggle}
					style={type.style}
				/>
			))}
		</div>
	)
}

export default MessageEditor
