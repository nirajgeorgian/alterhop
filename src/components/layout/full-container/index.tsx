import React from 'react'
import styles from 'components/layout/style.module.less'

const FullContainer: React.FC = ({ children }) => <div className={styles.layout}>{children}</div>

export default FullContainer
