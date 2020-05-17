import { connect } from 'react-redux'

import UserSearchInput from '../../../components/UserSearchInput'
import { searchUsers } from '../../../reducers/users'

const mapStateToProps = null
const mapDispatchToProps = { onChangeText: searchUsers }

export default connect(mapStateToProps, mapDispatchToProps)(UserSearchInput)
