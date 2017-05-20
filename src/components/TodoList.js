import React, { PropTypes } from 'react';
import { StyleSheet, Text, View, Button, ListView, Keyboard } from 'react-native';
import { connect } from 'react-redux';

import Row from "./Row";

// class TodoList extends React.Component {
//   buildDS = () => {
//     const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
//     return ds.cloneWithRows(this.props.todoList);
//   }
//
//   state = {
//     dataSource: this.buildDS(),
//   }
//
//   handleUpdateText = (key, text) => {
//     const newItems = this.state.items.map((item) => {
//       if (item.key !== key) return item;
//       return {
//         ...item,
//         text
//       }
//     })
//     // this.setSource(newItems, filterItems(this.state.filter, newItems));
//   }
//
//   handleToggleEditing(key, editing) {
//     const newItems = this.state.items.map((item) => {
//       if (item.key !== key) return item;
//       return {
//         ...item,
//         editing
//       }
//     })
//     // this.setSource(newItems, filterItems(this.state.filter, newItems));
//   }
//
//   setSource(items, itemsDatasource, otherState = {}) {
//     // this.setState({
//     //   items,
//     //   dataSource: this.state.dataSource.cloneWithRows(itemsDatasource),
//     //   ...otherState
//     // })
//     // AsyncStorage.setItem("items", JSON.stringify(items));
//   }
//
//   handleRemoveItem(key) {
//     const newItems = this.state.items.filter((item) => {
//       return item.key !== key
//     })
//     // this.setSource(newItems, filterItems(this.state.filter, newItems));
//   }
//
//   handleToggleComplete(key, complete) {
//     const newItems = this.state.items.map((item) => {
//       if (item.key !== key) return item;
//       return {
//         ...item,
//         complete
//       }
//     })
//     // this.setSource(newItems, filterItems(this.state.filter, newItems));
//   }
//
//   render() {
//     console.log("in the TODO list", this);
//     return (
//       <View style={styles.content}>
//         <ListView
//           style={styles.list}
//           enableEmptySections
//           dataSource={this.state.dataSource}
//           onScroll={() => Keyboard.dismiss()}
//           renderRow={({ key, ...value}) => {
//             return (
//               <Row
//                 key={key}
//                 onUpdate={(text) => this.handleUpdateText(key, text)}
//                 onToggleEdit={(editing) => this.handleToggleEditing(key, editing)}
//                 onRemove={() => this.handleRemoveItem(key)}
//                 onComplete={(complete) => this.handleToggleComplete(key, complete)}
//                 {...value}
//               />
//             )
//           }}
//           renderSeparator={(sectionId, rowId) => {
//             return <View key={rowId} style={styles.separator}/>
//           }}
//         />
//       </View>
//     )
//   }
// }

const TodoList = ({todoList}) => {
  console.log("todoList component %o", todoList);
  const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

  return (
    <View style={styles.content}>
      <ListView
        style={styles.list}
        enableEmptySections
        dataSource={ds.cloneWithRows(todoList)}
        onScroll={() => Keyboard.dismiss()}
        renderRow={({ key, ...value }) => {
          return (
            <Row
              key={key}
              {...value}
            />
          )
        }}
        renderSeparator={(sectionId, rowId) => {
          return <View key={rowId} style={styles.separator}/>
        }}
      />
    </View>
  )
};

// HomeScreen.propTypes = {
//   dispatch: PropTypes.func.isRequired,
//   todos: PropTypes.array
// };
//
// const mapStateToProps = state => ({
//   todos: state.todosReducer,
// });

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  list: {
    backgroundColor: '#FFF'
  },
  separator: {
    borderWidth: 1,
    borderColor: "#F5F5F5"
  },
})

export default connect()(TodoList);
