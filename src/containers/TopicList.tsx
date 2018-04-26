import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import TopicCard from '../components/TopicCard'

import { HotTopicInfo } from '../TypeDefinitions/HotTopicInfo'

import { fetchHot } from '../utility/api'

interface Props extends RouteComponentProps<{}> {

}

interface State {
  hot: HotTopicInfo[]
}

class TopicList extends React.Component<Props, State> {

  state: State = {
    hot: []
  }

  async componentDidMount() {
    this.setState({
      hot: await fetchHot()
    })
  }

  clickHandle = (topicID: any) => {
    this.props.history.push('/topic/' + topicID)
  }

  render() {
    const { hot } = this.state

    return (
      <div>
        {hot.map((data) => <TopicCard
          key={data.id}
          topicData={data}
          clickHandle={this.clickHandle}
        />)}
      </div>
    )
  }
}

export default withRouter(TopicList)
