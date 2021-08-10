/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    FlatList,
    ActivityIndicator,
    Alert,
    ListView,
    Image,
    TouchableOpacity,
    Share
} from 'react-native';


import {
    Container,
    Header,
    Title,
    Content,
    Footer,
    FooterTab,
    Button,
    Left,
    Right,
    Body,
    ListItem,
    List,
    Card,
    CardItem,
    Icon,
    Thumbnail,
    InputGroup,
    Badge,

    Fab

} from 'native-base';

//import the StackNavigator 
import {
    StackNavigator,
    DrawerNavigator
} from 'react-navigation';

var calenderDate = new Date();
calenderDate.getMonth();

//HomeScreen
class GeekulchaHome extends React.Component {


    static navigationOptions = {
        title: 'Geekulcha',
    };

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    componentDidMount() {

        return fetch('https://raw.githubusercontent.com/Nanikie/Geekulcha-Events/master/events.json')
            .then((response) => response.json())
            .then((responseJson) => {
                let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                this.setState({
                    isLoading: false,
                    dataSource: ds.cloneWithRows(responseJson),
                }, function() {
                    // In this block you can do something with new state.
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }
    GetItem (eventName) {

        Alert.alert(eventName);

    }

    januaryEvents(rowData){
        if(rowData.date.month == 0){

        }
    }




    ListViewItemSeparator = () => {
        return (
            <View
                style={{
                    height: .5,
                    width: "100%",
                    backgroundColor: "#000",
                }}
            />
        );
    }


    render() {
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator />
                </View>
            );
        }

        const {navigate} = this.props.navigation;
        return (
            <Container>
                <Header style={styles.header}>

                    <Left>
                        <Button transparent>
                            <Icon name="menu" onPress={() => alert("I dont know w")}/>

                        </Button>
                    </Left>
                    <Body>
                    <Title>Geekulcha Events</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Thumbnail square size={80} source={{uri: 'http://blog.geekulcha.com/content/images/2017/10/logo-2.png'}}/>
                        </Button>

                    </Right>
                </Header>


                <Content>



                    <ListView
                        dataSource={this.state.dataSource}

                        renderRow={(rowData) =>
                            <ListItem onPress={() => navigate('Events', {rowData: rowData})}>

                                <Thumbnail round size={200}  source={{ uri: rowData.img }}/>
                                <Body>
                                <Text style={styles.eventTitle}> {rowData.eventName} </Text>

                                <Text note style={styles.eventDescription}>
                                    {rowData.description}
                                </Text>
                                <Text note style={styles.eventDate}>
                                    {rowData.eventDuration}
                                </Text>

                                </Body>

                            </ListItem>}

                    />

                </Content>

                <Footer>
                    <FooterTab style={styles.footer}>
                        <Button style={styles.activeFooter} active>
                            <Icon name="home"/>
                            <Text style={styles.footerText}></Text>
                        </Button>
                        <Button onPress={() => navigate('About')}>

                            <Icon name="paper"/>
                            <Text style={styles.footerText}></Text>
                        </Button>

                        <Button onPress={() => navigate('Contact')}>
                            <Icon name="contact"/>
                            <Text style={styles.footerText}></Text>
                        </Button>
                        <Button onPress={() => navigate('')}>
                            <Icon name="chatboxes"/>
                            <Text style={styles.footerText}></Text>
                        </Button>
                    </FooterTab>
                </Footer>

            </Container>
        );
    }
}

//AboutGeekulcha
class AboutGeekulcha extends React.Component {
    static navigationOptions = {
        title: 'About Geekulcha',
    };

    render() {
        const {navigate} = this.props.navigation;
        return (
            <Container>
                <Header style={styles.header}>
                <Body>
                    <Title>
                        About Us
                    </Title>
                </Body>
                </Header>

                <Content>


                    <Card>
                        <CardItem>
                            <Left>
                                <Thumbnail source={{uri: 'http://blog.geekulcha.com/content/images/2017/10/logo-2.png'}}/>
                                <Body>
                                <Text style={styles.titleGeekucha}>Geekulcha</Text>
                                <Text note style={styles.p2}>Growing a culture of Geeks</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem cardBody>
                            <Image source={{uri: 'data:image/png;base64,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'}} style={{height: 200, width: null, flex: 1}}/>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Button transparent>
                                    <Icon active name="thumbs-up"/>
                                    <Text>12 Likes</Text>
                                </Button>
                            </Left>
                            <Body>
                            <Button transparent>
                                <Icon active name="chatbubbles"/>
                                <Text>4 Comments</Text>
                            </Button>
                            </Body>
                            <Right>
                                <Text>11h ago</Text>
                            </Right>
                        </CardItem>
                        <Text style={styles.p1}>
                            Geekulcha is where the young, skilled, creative and ambitious tech minds meet to connect with
                            each other, share knowledge, collaborate on projects, network with industry leaders, obtain
                            training to further improve and enhance their skills and to put that newly acquired skill to
                            work.
                        </Text>
                        <Text style={styles.p1}>
                            Established 15 March 2013, our focus is on <Text style={styles.p2}>empowering young geeks
                            through ICT skills development and training</Text> while giving them a taste of what awaits them
                            in the big world through industry exposure.
                        </Text>

                        <Title style={styles.eventDate}>A Geek Culture of Sustainable Innovation</Title>
                        <Image source={require('./intro.jpg')} style={{height: 200, width: null, flex: 1}}/>
                    </Card>



                </Content>
                <Footer>
                    <FooterTab style={styles.footer}>
                        <Button onPress={() => navigate('Home')}>
                            <Icon name="home"/>
                            <Text style={styles.footerText}></Text>
                        </Button>
                        <Button style={styles.activeFooter} active onPress={() => navigate('About')}>

                            <Icon name="paper"/>
                            <Text style={styles.footerText}></Text>
                        </Button>

                        <Button onPress={() => navigate('Contact')}>
                            <Icon name="contact"/>
                            <Text style={styles.footerText}></Text>
                        </Button>
                        <Button onPress={() => navigate('Meetups')}>
                            <Icon name="chatboxes"/>
                            <Text style={styles.footerText}></Text>
                        </Button>
                    </FooterTab>
                </Footer>

            </Container>
        );
    }
}

//When an event is clicked, the user is taken to EventDetails screen
//EventDetails
class EventDetails extends React.Component {
    static navigationOptions = {
        title: 'Events',
    };

    constructor(props){
        super(props);

        this._shareEvent = this._shareEvent.bind(this);
        this._showResult = this._showResult.bind(this);
        this.state = { result: ''};
    }

    _showResult(result){
        this.setState({result})
    }



    _shareEvent(rowData){
        Share.share({
            message: rowData.eventName + "\n\n" + rowData.description

        }).then(this.showResult);
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <Container>
                <Header style={styles.header}>
                    <Body>
                    <Title>

                        {this.props.navigation.state.params.rowData.eventName}
                    </Title>
                    </Body>


                </Header>
                <Content>
                    <Title style={styles.titleGeekucha}>
                        Year 2018 Activities and Support Need
                    </Title>
                    <Card style={{flex: 0}}>
                        <CardItem>
                            <Left>
                                <Thumbnail source={{uri: 'http://blog.geekulcha.com/content/images/2017/10/logo-2.png'}} />
                                <Body>
                                <Text style={styles.eventTitle}>{this.props.navigation.state.params.rowData.eventName}</Text>
                                <Text note style={styles.eventDescription}>{this.props.navigation.state.params.rowData.targetDescription}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem>
                            <Body>
                            <Image source={{uri: this.props.navigation.state.params.rowData.img}} style={styles.imageProperty} />
                            <Text style={styles.title}>
                                {this.props.navigation.state.params.rowData.eventDuration}
                            </Text>
                            <Text style={styles.eventTitle}>
                                <Text style={styles.title}>Theme :</Text> {this.props.navigation.state.params.rowData.description}
                            </Text>
                            <TouchableOpacity onPress={this._shareEvent(this.props.navigation.state.params.rowData)}>
                                <Text style={styles.title}>
                                    Share Event
                                </Text>
                            </TouchableOpacity>

                            </Body>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Button transparent textStyle={{color: '#87838B'}}>

                                </Button>
                            </Left>
                        </CardItem>
                    </Card>

                </Content>


                <Footer>
                    <FooterTab style={styles.footer}>
                        <Button style={styles.activeFooter} active>
                            <Icon name="home"/>
                            <Text style={styles.footerText}></Text>
                        </Button>
                        <Button onPress={() => navigate('About')}>

                            <Icon name="paper"/>
                            <Text style={styles.footerText}></Text>
                        </Button>

                        <Button onPress={() => navigate('Contact')}>
                            <Icon name="contact"/>
                            <Text style={styles.footerText}></Text>
                        </Button>
                        <Button onPress={() => navigate('')}>
                            <Icon name="chatboxes"/>
                            <Text style={styles.footerText}></Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}


//Geekulcha Contacts
class GeekulchaContact extends React.Component {
    static navigationOptions = {
        title: 'Events',
    };

    render() {
        const {navigate} = this.props.navigation;
        return (
            <Container>
                <Header style={styles.header}>
                    <Body>
                    <Title>
                        Contact Us
                    </Title>
                    </Body>

                </Header>
                <Content>


                    <Body>
                    <Image source={require('./logo.jpg')} style={{height: 200, width: null, flex: 1}}/>
                    <Text style={styles.titleGeekucha}>Geekulcha</Text>

                    </Body>

                    <Text style={styles.titleGeekucha}>Find Help Directly</Text>

                    <Text style={styles.p1}>
                        General Information: <Text style={styles.p2}> info@geekulcha.com</Text>
                    </Text>

                    <Text style={styles.p1}>
                        Joining Geekulcha: <Text style={styles.p2}> dev@geekulcha.com </Text>
                    </Text>

                    <Text style={styles.p1}>
                        Job Opportunities: <Text style={styles.p2}> hiregeeks@geekulcha.com</Text>
                    </Text>

                    <Text style={styles.p1}>
                        Media/Press: <Text style={styles.p2}> info@geekulcha.com </Text>
                    </Text>

                    <Text style={styles.p1}>Radio Show: <Text style={styles.p2}> connect@geekulcha.com </Text>
                    </Text>

                    <Text style={styles.titleGeekucha}>Information</Text>

                </Content>
                <Footer>
                    <FooterTab style={styles.footer}>
                        <Button onPress={() => navigate('Home')}>
                            <Icon name="home"/>
                            <Text style={styles.footerText}></Text>
                        </Button>
                        <Button onPress={() => navigate('About')}>

                            <Icon name="paper"/>
                            <Text style={styles.footerText}></Text>
                        </Button>

                        <Button style={styles.activeFooter} active onPress={() => navigate('Contact')}>
                            <Icon name="contact"/>
                            <Text style={styles.footerText}></Text>
                        </Button>
                        <Button onPress={() => navigate('Meetups')}>
                            <Icon name="chatboxes"/>
                            <Text style={styles.footerText}></Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}


//Here I will define all my screens (routes)
export const GeekulchaEvents = StackNavigator({
        Home: {screen: GeekulchaHome},
        About: {screen: AboutGeekulcha},
        Events: {screen: EventDetails},
        Contact: {screen: GeekulchaContact}
    }
    );



//This will be the homepage
export default class App extends Component<{}> {
    render() {
        return (
            <GeekulchaEvents/>
        );
    }
}


const styles = StyleSheet.create({
    title: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 30,
        paddingLeft: 30,
        paddingBottom: 20,

    },
    headerTitle: {
        paddingTop: 50,
    },

    titleGeekucha: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16,


    },
    p1: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 15,

        paddingTop: 20,
        paddingLeft: 20,
        paddingBottom: 20,

    },
    p2: {
        color: 'red',
        fontWeight: 'bold',
        fontSize: 15,
        fontFamily: 'ms comic sans',


    },
    header: {
        backgroundColor: '#191a18',

    },
    footer: {
        backgroundColor: '#191a18',
    },
    activeFooter: {
        backgroundColor: 'red',
    },
    red: {
        color: 'red',
    },

    listDiv: {
        backgroundColor: 'white',
        fontWeight: 'bold',


    },
    text: {

        fontWeight: 'bold',
        fontSize: 18,
        color: '#78060f'
    },

    footerText: {

        fontWeight: 'bold',
        fontSize: 14,
        color: 'white'
    },

    eventTitle: {


        fontSize: 20,
        color: '#ff0000',
        paddingLeft : 30,
        fontWeight: 'bold'
    },
    eventDescription: {

        paddingLeft : 30,
        fontSize: 16,
        color: 'black'
    },
    eventDate: {
        fontWeight: 'bold',
        paddingLeft : 30,
        fontSize: 18,
        color: 'black',
        paddingBottom: 20,
    },

    eventMore: {

        fontWeight: 'bold',
        fontSize: 12,
        color: 'black'
    },
    imageProperty:{

        paddingLeft: 100,
        height: 300,
        width: 400,
        flex: 1
    }


})