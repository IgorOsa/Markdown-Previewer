import React from 'react';
import './App.css';
import { Container, Row, Col } from 'react-bootstrap';
import marked from 'marked';

const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target="_blank" rel="noopener noreferrer" href="${href}">${text}` + `</a>`;
}

marked.setOptions({
  breaks: true,
  renderer: renderer,
  sanitize: true
});

class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      input: placeholder
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }

  convetToMarkdown() {
    let md = marked(this.state.input);
    return {__html : md};
  }

  render () {
    return (
      <Container>
        <Row>
          <Col>
            <div class="form-group">
              <h2 className="section-name">Editor</h2>
              <textarea id="editor" className="form-control" rows="10" placeholder={placeholder} onChange = {this.handleChange}>
                {this.state.input} 
              </textarea>
            </div>
          </Col>
          <Col>
            <div className="output">
              <h2 className="section-name">Preview</h2>
              <div className="preview" id="preview" dangerouslySetInnerHTML={this.convetToMarkdown()}>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

const placeholder = 
`# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:
  
Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
  
You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | ------------- 
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want! 
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`

export default App;
