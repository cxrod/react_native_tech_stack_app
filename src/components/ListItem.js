import React, { Component } from 'react';
import { 
    Text, 
    TouchableWithoutFeedback, 
    View, 
    LayoutAnimation,
    UIManager } from 'react-native';
import { connect } from 'react-redux';
import { CardSection } from './common';
import * as actions from '../actions';

class ListItem extends Component {

    componentWillUpdate() {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.linear();
    }

    renderDescription() {

        const { library, expanded } = this.props;

        if (expanded) {
            return (
                <CardSection style={{ flex: 1 }}>
                    <Text>{library.description}</Text>
                </CardSection>
            );
        }
    }
    
    render() {
        const { titleStyle } = styles;
        const { id, title } = this.props.library;

        return (
            <TouchableWithoutFeedback 
                onPress={() => this.props.selectedLibrary(id)}
            >
                <View>
                    <CardSection>
                        <Text style={titleStyle} >
                            {title}
                        </Text>
                    </CardSection>
                    {this.renderDescription()}
                </View>
            </TouchableWithoutFeedback>
        );
    }

}

const styles = {
    titleStyle: {
        fontSize: 18,
        paddingLeft: 16
    }
};

const mapStateProps = (state, ownProps) => {
    
    const expanded = state.selectedLibraryId === ownProps.library.id;

    return { expanded };
};

export default connect(mapStateProps, actions)(ListItem);
