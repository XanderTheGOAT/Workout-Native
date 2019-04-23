import React, { Component } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import WorkoutCard from '../components/WorkoutCard'
import WorkoutInterval from '../components/WorkoutInterval'
import { WorkoutContext } from '../context/Workout'

const imageMapper = {
  run1: require('../assets/images/run1.jpg'),
  run2: require('../assets/images/run2.jpg'),
  run3: require('../assets/images/run3.jpg'),
  run4: require('../assets/images/run4.jpg'),
  run5: require('../assets/images/run5.jpg'),
  run6: require('../assets/images/run6.jpg'),
  lift1: require('../assets/images/lift1.jpg'),
  lift2: require('../assets/images/lift2.jpg'),
  lift3: require('../assets/images/lift3.jpg'),
  lift4: require('../assets/images/lift4.jpg'),
  lift5: require('../assets/images/lift5.jpg'),
  lift6: require('../assets/images/lift6.jpg')
}

export default class WorkoutScreen extends Component {
  static navigationOptions = {
    title: 'Workout',
  };

  state = {
    selectedWorkout: {}
  }

  handleSelectedWorkout = selectedWorkout => this.setState({ selectedWorkout })

  renderWorkoutMenu = () => (
    <WorkoutContext.Consumer>
      {({app: { workouts }}) => (
          workouts.map(({
            id,
            name,
            image,
            description,
            activities
          }) => (
            <WorkoutCard
              key={id}
              image={imageMapper[image]}
              name={name}
              description={description}
              activities={activities}
              handleSelectedWorkout={this.handleSelectedWorkout} />
          )
      ))}
    </WorkoutContext.Consumer>
  )

  renderWorkout = () => (
    <WorkoutContext.Consumer>
      {({app: { activities }}) =>
      <WorkoutInterval
        activities={activities}
        selectedWorkout={this.state.selectedWorkout} />}
    </WorkoutContext.Consumer>
  )

  render() {
    return (
      <View style={{flex: 1, flexWrap: 'wrap', flexDirection: 'column'}}>
        {Object.values(this.state.selectedWorkout).length > 0 ? this.renderWorkout() : this.renderWorkoutMenu()}
      </View>
    )
  }
}
