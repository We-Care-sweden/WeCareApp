import {Member} from './Member'
import {Location} from './Location'
import {Risk} from './Risk'
import {Setting} from './Setting'

export class User {
  id = null
  uuid = null
  members = [Member]
  location = Location
  risk = Risk
  settings = Setting
}
