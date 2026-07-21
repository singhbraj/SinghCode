import child_process from 'child_process'
import until from 'util'

export const execPromisified = until.promisify(child_process.exec);