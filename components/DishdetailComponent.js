import React, { Component, useRef } from 'react';
import { Text, View, ScrollView, FlatList,Modal, StyleSheet, Alert, Button, PanResponder } from 'react-native';
import { Card, Icon, Rating, Input} from 'react-native-elements';
import { postFavorite, postComment } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';


import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favorites: state.favorites
    }
  }

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId) => dispatch(postComment(dishId))
})




function RenderComments(props) {

    const comments = props.comments;
            
    const renderCommentItem = ({item, index}) => {
        
        return (
            
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Rating 
                        startingValue={parseInt(item.rating)} 
                        style={styles.rating}
                        imageSize={12}
                        readonly
                    />
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        );
    };
    
    return (
        <Animatable.View 
        animation="fadeInUp"
        duration={2000}
        delay={1000}
        >
            <Card title='Comments' >
            <FlatList 
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={(item) => item.id.toString()}
                />
            </Card>
        </Animatable.View>
    );
}

function RenderDish(props) {

    const dish = props.dish;
    
    const viewRef = useRef(null);

    const recognizeDrag = ({moveX, moveY, dx, dy}) => {
        if(dx < -200)
            return true;
        else 
            return false;
    };

    const recognizeComment = ({ moveX, moveY, dx, dy }) => {
        if (dx > 200)
          return true;
        else
          return false;
      };


    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
            return true;
        },
        onPanResponderGrant: ()=> {
            viewRef.current.rubberBand(1000)
            .then(endState => console.log(endState.finished ? 'finished' : 'cancelled'))
        },
        onPanResponderEnd: (e, gestureState) => {
            if (recognizeDrag(gestureState))
                Alert.alert(
                    'Add to Favorites?',
                    'Are you sure you want to add' + dish.name + 'to your favorites?'
                    [
                        {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel pressed'),
                            style: 'cancel'
                        },
                        {
                            text: 'OK',
                            onPress: () => props.favorite ? console.log('Already favorite') : props.onPress()
                           

                        }
                    ],
                    { cancelable: false }
                                      
                    )
                    else if (recognizeComment(gestureState)) {
                        props.toggleModal()
                      }
            return true;
        }
    });
    
        if (dish != null) {
            return(
                <Animatable.View 
                animation="fadeInDown"
                duration={2000}
                delay={1000}
                ref={viewRef}
                {...panResponder.panHandlers}
                >
                <Card
                featuredTitle={dish.name}
                image={{uri: baseUrl + dish.image}}>
                <Text style={{margin: 10}}>
                    {dish.description}
                </Text>
                <View style={styles.formRow}>
                    <Icon
                        raised
                        reverse
                        name={ props.favorite ? 'heart' : 'heart-o'}
                        type='font-awesome'
                        color='#f50'
                        onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                        />
                    <Icon
                        raised
                        reverse
                        name={'pencil'}
                        type='font-awesome'
                        color='#512DA8'
                        onPress={props.onComment}
                    />
                </View> 
            </Card>
            </Animatable.View>
            );
        }
        else {
            return(<View></View>);
        }
}

class Dishdetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            author: '',
            comment: '',
            rating: 3,
            showModal: false
        }
    }
    
    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }

    resetForm = () => {
        this.setState({
            author: '',
            comment: '',
            rating: 3,
        });
    }

    handleComment = (dishId) => () => {
        
        this.props.postComment(
            dishId, 
            this.state.rating,
            this.state.author,
            this.state.comment,
        );

        this.toggleModal();
        this.resetForm();
    }

    
    static navigationOptions = {
        title: 'Dish Details'
    };

    render() {
        const { navigate } = this.props.navigation;
        const dishId = this.props.route.params.dishId;
        return(
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]}
                    favorite={this.props.favorites.some(el => el === dishId)}
                    onPress={() => this.markFavorite(dishId)} 
                    toggleModal={() => this.toggleModal()}
                    />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
                <Modal animationType = {"slide"} transparent = {false}
                    visible = {this.state.showModal}
                    onDismiss = {() => this.toggleModal() }
                    onRequestClose = {() => this.toggleModal() }>
                <View style={styles.formRow}>
                    <Rating
                        type='star'
                        ratingCount={5}
                        imageSize={60}
                        showRating
                        onFinishRating={this.handleRating}
                    />
                </View>
                <View style={styles.formRow}>
                    <Input 
                        placeholder='Author'
                        leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                        leftIconContainerStyle={styles.icon}
                        onChangeText={(author) => this.setState({ author })}
                    />
                </View>
                <View style={styles.formRow}>
                    <Input
                        placeholder='Comment'
                        leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
                        leftIconContainerStyle={styles.icon}
                        onChangeText={(comment) => this.setState({ comment })}
                    />
                </View>
                <View style={styles.formRow}>
                    <Button
                        title='SUBMIT'
                        onPress={this.handleComment(dishId)}
                        containerStyle={styles.button}
                        buttonStyle={{ backgroundColor: '#512DA8' }}
                    />
                </View>
                <View style={styles.formRow}>
                    <Button
                        title='CANCEL'
                        onPress = {() =>{this.toggleModal(); this.resetForm();}}
                        containerStyle={styles.button}
                        buttonStyle={{ backgroundColor: '#808080' }}
                    />
                </View>
            </Modal>
            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        margin: 20
    },
    modal: {
        justifyContent: 'center',
        margin: 20,
    },
    icon: {
        marginRight: 15
    },
    button: {
        flex: 1,
    },
    rating: {
        flexDirection: 'row',
        alignContent: 'flex-start',
        justifyContent: 'flex-start',
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);
