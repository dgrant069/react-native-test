import React, { PropTypes } from 'react';
import { StyleSheet, Text, View, Button, ListView, Keyboard } from 'react-native';
import { connect } from 'react-redux';

import GiftsListCard from "../giftsListCard/GiftsListCard";

import css from './GiftsList.css';

import { deleteGift, editGift } from '../../data/actions/gifts';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class GiftsList extends React.Component {
  removeGift = (gift) => {
    return this.props.dispatch(deleteGift(this.props.giftsList, gift));
  }

  handleUpdates = (oldGift, update = {}) => {
    const updatedGift = {...oldGift, ...update}
    return this.props.dispatch(editGift(this.props.giftsList, updatedGift));
  }

  filteredGiftsList = () => {
    if(this.props.filterType === "ALL") return this.props.giftsList;
    const isCompleted = () => {
      if(this.props.filterType === "ACTIVE") return false;
      return true;
    }

    const filteredList = this.props.giftsList.filter((gift) => {
      return gift.completed === isCompleted();
    });

    return filteredList;
  }

  render(){
    return (
      <View style={styles.content}>
        <ListView
          style={styles.list}
          enableEmptySections
          dataSource={ds.cloneWithRows(this.filteredGiftsList())}
          onScroll={() => Keyboard.dismiss()}
          renderRow={(gift) => {
            return (
              <GiftsListCard
                giftId={gift.id}
                onUpdateSave={(name) => this.handleUpdates(gift, {name})}
                onComplete={(completed) => this.handleUpdates(gift, {completed})}
                removeGift={() => this.removeGift(gift)}
                {...gift}
              />
            )
          }}
          renderSeparator={(sectionId, rowId) => {
            return <View key={rowId} style={styles.separator}/>
          }}
        />
      </View>
    )
  }
}

GiftsList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  giftsList: PropTypes.array.isRequired,
  filterType: PropTypes.string.isRequired,
};

const mapStateToProps = state => {
  return {
    giftsList: state.giftsList,
    filterType: state.filters.filterType,
  }
};

const styles = StyleSheet.create(css);
export default connect(mapStateToProps)(GiftsList);
