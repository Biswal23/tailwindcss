import { cloneDeep } from '../util/cloneDeep'
import defaultConfig from '../../stubs/config.full'
import oxideConfig from '../../stubs/config.oxide.full'

if (__OXIDE__ === true) {
  console.log('potato')
}

export default __OXIDE__ ? cloneDeep(oxideConfig) : cloneDeep(defaultConfig)
