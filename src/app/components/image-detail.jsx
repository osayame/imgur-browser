var React = require('react');
var Reflux = require('reflux');
var Actions = require('../actions');
var ImageStore = require('../stores/image-store');
var CommentStore = require('../stores/comment-store');
var ReactRouter = require('react-router');
var CommentBox = require('./comment-box');
var Link = ReactRouter.Link;

module.exports = React.createClass({
  mixins : [
    Reflux.listenTo(ImageStore, 'onChange'),
    Reflux.listenTo(CommentStore, 'onChange')
  ],
  getInitialState : function() {
    return {
      image: null,
      comments: null
    }
  },
  componentWillMount : function () {
    Actions.getImage(this.props.params.id);
  },
	render : function () {
		return <div>
      {this.state.image ? this.renderContent() : null}
    </div>
	},
  renderContent() {
    return <div className="panel panel-default image-detail">
      <div className="panel-heading">
        <h4>{this.state.image.title}</h4>
      </div>
      <div className="panel-body">
        {this.renderImage()}
      </div>
      <div className="panel-footer">
        <h5>{this.state.image.description}</h5>
      </div>
      <h3>Comments</h3>
      {this.renderComments()}
    </div>
  },
  renderComments() {
    if(!this.state.comments){
      return null
    }

    return <CommentBox comments={this.state.comments}/>
  },
  renderImage() {
    if(this.state.image.animated) {
      return <video preload="auto" autoPlay="autoplay" loop="loop" webkit-playsinline>
        <source src={this.state.image.mp4} type="video/mp4"></source>
      </video>
    } else {
      return <img src={this.state.image.link}/>
    }
  },
  onChange : function () {
    this.setState({
      image: ImageStore.find(this.props.params.id),
      comments: CommentStore.comment
    });
  }
});
