import React from 'react'
// import { Link } from 'gatsby'

import Layout from '../components/layout'

import DATA from '../data/placeholderdata'

class IndexPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = { csvData: '', jsonData: '' }

    this.onPrefillClick = this.onPrefillClick.bind(this)
    this.onCSVChange = this.onCSVChange.bind(this)
    this.onJsonChange = this.onJsonChange.bind(this)
    this.processText = this.processText.bind(this)
    this.clear = this.clear.bind(this)
    this.downloadJSON = this.downloadJSON.bind(this)
  }
  convertPins(pin) {
    const filteredPins = pin.filter(
      entry =>
        entry.indexOf('Corner Pin') === -1 &&
        entry.indexOf(',,,') < 0 &&
        entry.indexOf('Frame,X') === -1 &&
        entry.indexOf('End of Keyframe Data') === -1
    )
    return filteredPins.map(el => {
      const item = el.split(',')
      return {
        frame: item[1],
        xpos: item[2],
        ypos: item[3],
      }
    })
  }
  clear() {
    this.setState({ csvData: '', jsonData: '' })
    document.getElementById('csv').value = ''
  }
  onCSVChange() {}
  onJsonChange() {}
  downloadJSON() {
    const dataString = `data:text/json;charset=utf-8,${encodeURIComponent(
      this.state.jsonData
    )}`
    let downloadAnchorNode = document.createElement('a')
    downloadAnchorNode.setAttribute('href', dataString)
    downloadAnchorNode.setAttribute('download', 'trackingdata.json')
    document.body.appendChild(downloadAnchorNode) // required for firefox
    downloadAnchorNode.click()
    downloadAnchorNode.remove()
  }
  processText(ev) {
    const source = document.getElementById('csv').value

    this.setState({csvData: source})
    const pins = {
      cornerTopLeft: source
        .substring(
          source.indexOf('Corner Pin-0001'),
          source.indexOf('Corner Pin-0002')
        )
        .split('\n'),
      cornerTopRight: source
        .substring(
          source.indexOf('Corner Pin-0002'),
          source.indexOf('Corner Pin-0003')
        )
        .split('\n'),
      cornerBottomLeft: source
        .substring(
          source.indexOf('Corner Pin-0003'),
          source.indexOf('Corner Pin-0004')
        )
        .split('\n'),
      cornerBottomRight: source
        .substring(
          source.indexOf('Corner Pin-0004'),
          source.indexOf('Keyframe Data')
        )
        .split('\n'),
    }
    pins.cornerTopLeft = this.convertPins(pins.cornerTopLeft)
    pins.cornerTopRight = this.convertPins(pins.cornerTopRight)
    pins.cornerBottomLeft = this.convertPins(pins.cornerBottomLeft)
    pins.cornerBottomRight = this.convertPins(pins.cornerBottomRight)
    console.log(pins)
    this.setState({ jsonData: JSON.stringify(pins) })
  }

  onPrefillClick() {
    this.setState(
      {
        csvData: DATA.value,
      },
      () => {
        this.processText()
      }
    )
  }

  onCSVUpdate() {
    // processText()
  }

  render() {
    return (
      <Layout>
        <div className="tracking-layout">
          <div className="head">
            <button onClick={this.clear}>Clear</button>
            <button onClick={this.onPrefillClick}>
              Prefill with demo content
            </button>
            <button onClick={this.downloadJSON}>Download JSON</button>
          </div>
          <textarea
            id="csv"
            placeholder="Paste in your CSV data here"
            // value={this.state.csvData}
            onInput={this.processText}
            onChange={this.onCSVChange}
          />
          <textarea
            id="json"
            placeholder="Your processed JSON will be here"
            value={this.state.jsonData}
            readOnly
            // onChange={this.onJsonChange}
          />
        </div>
        <a
          href="https://codepen.io/mephysto/pen/jeWVZB"
          target="_blank"
          rel="noopener noreferrer"
        >
          Or check out this Codepen
        </a>
      </Layout>
    )
  }
}
export default IndexPage
