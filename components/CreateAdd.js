import React from 'react'
import { View, TouchableOpacity, Modal, Text} from 'react-native'

import CreateAddActivityForm from './CreateAddActivityForm'
import TextRowLinks from '../ui_components/TextRowLinks'
import TextInput from '../ui_components/TextInput'
import TextList from '../ui_components/TextList'
import Select from '../ui_components/Select'
import Icon from 'expo/build/Icon';
import TextSubHeader from '../ui_components/TextSubHeader'

const CreateAdd = ({
  handleToggleIsAddActivitiesModalVisible,
  handleUpdateAddSelectedType,
  handleModeChange,
  handleAddActivities,
  handleRemoveActivities,
  addSelectedType,
  addTextInputValue,
  addTextInputDescription,
  addActivitiesCollection,
  isAddActivitiesModalVisible
}) => (
  <View style={{flex: 1}}>
    <TextRowLinks
      leftText={'Back'}
      leftTextCallback={()=>handleModeChange(0)}
      rightText={'Save'}
      rightTextCallback={()=>{}} />
    <Select
      options={[
        {label: 'workout', value: 'workout', key: 'workout'},
        {label: 'activity', value: 'activity', key: 'activity'}
      ]}
      optionSelected={addSelectedType}
      handleOptionSelected={handleUpdateAddSelectedType} />
    <TextInput value={addTextInputValue} />
    <TextInput value={addTextInputDescription} />
    <View style={{flex:1}}>
      {addSelectedType === 'workout' &&
        <CreateAddActivityList
          addActivitiesCollection={addActivitiesCollection}
          handleRemoveActivities={handleRemoveActivities}
          handleToggleIsAddActivitiesModalVisible={handleToggleIsAddActivitiesModalVisible} />}
    </View>
    <Modal
      animationType='slide'
      transparent={false}
      visible={isAddActivitiesModalVisible}>
      <CreateAddActivityForm
        add={handleAddActivities}
        cancel={handleToggleIsAddActivitiesModalVisible} />
    </Modal>
  </View>
)

const CreateAddActivityList = ({
  addActivitiesCollection,
  handleRemoveActivities,
  handleToggleIsAddActivitiesModalVisible
}) => (
  <View style={{ padding: 20 }}>
    <TouchableOpacity
      onPress={handleToggleIsAddActivitiesModalVisible}
      style={{
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#000',
        height: 50 }}>
      <Icon.Ionicons name='ios-add-circle-outline' size={24} color={'#fff'} />
      <TextSubHeader text='Add Activities' fontStyle={{color: '#fff'}} />
    </TouchableOpacity>
    {!!addActivitiesCollection.length &&
      <TextList>
        {addActivitiesCollection.map(({
          activitySelected,
          timeInSeconds
        }, i) => (
          <View key={i} style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={()=>handleRemoveActivities(i)}>
              <Icon.Ionicons name='ios-remove-circle' size={24} />
            </TouchableOpacity>
            <Text style={{lineHeight: 24, paddingLeft: 10}} >{activitySelected} {timeInSeconds}</Text>
          </View>
        ))}
      </TextList>}
  </View>
)

export default CreateAdd