import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'

const IndexPage = () => (
  <Layout>
    <h1>Convert AE tracking data to a usable JSON format</h1>
    <div className="tracking-layout">
      <div className="head">
        <button>Prefill with demo content</button>
        <button>Download JSON</button>
      </div>
      <textarea id="csv" placeholder="Paste in your CSV data here" />
      <textarea id="json" placeholder="Your processed JSON will be here" />
    </div>
  </Layout>
)

export default IndexPage
