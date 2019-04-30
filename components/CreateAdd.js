import React from 'react'
import { View, Modal, StyleSheet } from 'react-native'

import { WorkoutContext } from '../context/WorkoutContext'
import CreateAddActivityForm from './CreateAddActivityForm'
import CreateAddActivityList from './CreateActivityList'
import WorkoutCard from '../components/WorkoutCard'
import TextRowLinks from '../ui_components/TextRowLinks'
import TextInput from '../ui_components/TextInput'
import Select from '../ui_components/Select'
import ButtonInput from '../ui_components/ButtonInput'

const SelectOptions = [
  {label: 'Workout', value: true, key: 'workout'},
  {label: 'Activity', value: false, key: 'activity'}
]

const CreateAdd = ({
  _setState,
  _setStateObj,
  payload,
  addWorkoutObj,
  addActivityObj,
  addSelectedType,
  handleImagePicker,
  handleAddActivities,
  handleRemoveActivities,
  isWorkoutSelected,
  isAddWorkoutActivitiesModalVisible,
}) => (
  <View style={styles.container}>

    <WorkoutContext.Consumer>
      {({append}) =>
      <TextRowLinks
        isButton={true}
        leftText={'Back'}
        leftTextCallback={_setState('mode')(0)}
        rightText={'Save'}
        rightTextCallback={append(payload)} />}
    </WorkoutContext.Consumer>

    <Select
      options={SelectOptions}
      optionSelected={addSelectedType}
      handleOptionSelected={_setState('isWorkoutSelected')} />

    <TextInput
      placeholder='Enter a name'
      value={isWorkoutSelected ? addWorkoutObj.name : addActivityObj.name}
      onChangeText={_setStateObj(isWorkoutSelected ? 'addWorkoutObj' : 'addActivityObj')('name')} />

    <TextInput
      placeholder='Enter a description'
      value={isWorkoutSelected ? addWorkoutObj.description : addActivityObj.description}
      onChangeText={_setStateObj(isWorkoutSelected ? 'addWorkoutObj' : 'addActivityObj')('description')}  />

    {isWorkoutSelected &&
      <View style={styles.workoutButtonContainer}>
        <ButtonInput
          onPress={_setState('isAddWorkoutActivitiesModalVisible')(true)}
          iconName='ios-add-circle-outline'
          text='Add Activities' />
        <CreateAddActivityList
          activities={addWorkoutObj.activities}
          removeActivity={handleRemoveActivities} />
        <ButtonInput
          onPress={handleImagePicker}
          iconName='ios-images'
          text='Select an Image' />
        <WorkoutCard image={{ uri: addWorkoutObj.image }} />
      </View>}

    <Modal
      animationType='slide'
      transparent={false}
      visible={isAddWorkoutActivitiesModalVisible}>
      <WorkoutContext.Consumer>
        {({ activitiesOptions }) =>
        <CreateAddActivityForm
          addActivity={handleAddActivities}
          activityOptions={activitiesOptions}
          closeModal={_setState('isAddWorkoutActivitiesModalVisible')(false)} />}
      </WorkoutContext.Consumer>
    </Modal>

  </View>
)

const styles = StyleSheet.create({
  container: {flex: 1},
  workoutButtonContainer: {flex:1}
})

export default CreateAdd
