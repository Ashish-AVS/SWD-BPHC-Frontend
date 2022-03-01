
import React from 'react'
import classNames from 'classnames'
import Autolinker from 'react-autolinker'
// @material-ui/core
import { makeStyles } from '@material-ui/core/styles'
import Slide from '@material-ui/core/Slide'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
// core components
import GridItem from 'components/Grid/GridItem.js'
import GridContainer from 'components/Grid/GridContainer.js'
import CustomTabs from 'components/CustomTabs/CustomTabs.js'
import { BaseUrl } from 'variables/BaseUrl'

import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js'

const useStyles = makeStyles(styles)
const Transition = React.forwardRef(function Transition (props, ref) {
  return <Slide direction='down' ref={ref} {...props} />
})

Transition.displayName = 'Transition'
export default function FAQ () {
  const classes = useStyles()
  const [faqData, setFaqData] = React.useState([])
  const token = JSON.parse(localStorage.getItem('tokens'))
  const [dataLoaded, setDataLoaded] = React.useState(false)
  const [contentData, setContentData] = React.useState([])
  const imageClasses = classNames(
    classes.imgFluid1
  )
  let data
  React.useEffect(() => {
    try {
      const fetchData = async () => {
        const result = await fetch(`${BaseUrl}/api/kya`, {
          headers: { Authorization: token }
        })
        const res = await result.json()
        if (result.status === 200 || result.status === 201) {
          console.log(res.data.kya)
          setFaqData(res.data.kya)
          // setDataLoaded(true)
        } else if (result.status === 401) { alert(res.msg) }
      }
      fetchData()
    } catch (err) {
      console.log(err)
    }
  }, [])

  const contentData1 = []
  if (faqData.depts !== undefined) {
    const deptData = faqData.depts.map(items => {
      return ({
        tabName: `${items.dept}`,
        tabContent: (
          items.data.map(content => {
            return (
              <div>
                {/* <strong><h3 style={{display:"flex",justifyContent:'center'}}>{content.main_topic.toUpperCase()}</h3></strong> */}
                <Accordion style={{ marginTop: '5px', background: '#e8eaed' }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls='panel1a-content'
                    id='panel1a-header'
                    style={{ fontSize: '14px' }}
                  >
                    <b>{content.question}</b>
                  </AccordionSummary>
                  <AccordionDetails style={{ whiteSpace: 'pre-wrap', fontSize: '17.5px', fontWeight: '400', background: '#f5f7fa' }}>
                    <Autolinker text={content.ans} />
                  </AccordionDetails>
                </Accordion>

              </div>
            )
          })
        )
      })
    })

    const gen_elecData = [{

      tabName: 'General Electives',
      tabContent: (
        faqData.gen_elec.map(content => {
          return (
            <div>
              {/* <strong><h3 style={{display:"flex",justifyContent:'center'}}>{content.main_topic.toUpperCase()}</h3></strong> */}

              <Accordion style={{ marginTop: '5px', background: '#e8eaed' }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls='panel1a-content'
                  id='panel1a-header'
                  style={{ fontSize: '14px' }}
                >
                  <b>{content.topic}</b>
                </AccordionSummary>
                <AccordionDetails style={{ whiteSpace: 'pre-wrap', fontSize: '17.5px', fontWeight: '400', background: '#f5f7fa' }}>
                  <Autolinker text={content.text} />
                </AccordionDetails>
              </Accordion>

            </div>
          )
        })
      )
    }]

    const course_guidesData =
    [{
      tabName: 'Course Guide-1st year',
      tabContent: (
        faqData.course_guides.map(content => {
          return (
            <div>
              <strong><h3 style={{ display: 'flex', justifyContent: 'center' }}>{content.year.toUpperCase()}</h3></strong>

              {content.data.map(item => {
                return (
                  <Accordion style={{ marginTop: '5px', background: '#e8eaed' }}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls='panel1a-content'
                      id='panel1a-header'
                      style={{ fontSize: '14px' }}
                    >
                      <b>{item.course_no}</b>
                    </AccordionSummary>
                    <AccordionDetails style={{ whiteSpace: 'pre-wrap', fontSize: '17.5px', fontWeight: '400', background: '#f5f7fa' }}>
                      <Autolinker text={item.advice} />
                    </AccordionDetails>
                  </Accordion>
                )
              })}

            </div>
          )
        })
      )
    }]

    const minorsData =
        [{
          tabName: 'Minors',
          tabContent: (
            faqData.minors.map(content => {
              return (
                <div>
                  <strong><h3 style={{ display: 'flex', justifyContent: 'center' }}>{content.main_topic.toUpperCase()}</h3></strong>

                  {content.data.map(item => {
                    return (
                      <Accordion style={{ marginTop: '5px', background: '#e8eaed' }}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls='panel1a-content'
                          id='panel1a-header'
                          style={{ fontSize: '14px' }}
                        >
                          <b>{item.topic}</b>
                        </AccordionSummary>
                        <AccordionDetails style={{ whiteSpace: 'pre-wrap', fontSize: '17.5px', fontWeight: '400', background: '#f5f7fa' }}>
                          <Autolinker text={item.text} />
                        </AccordionDetails>
                      </Accordion>
                    )
                  })}

                </div>
              )
            })
          )
        }]

    contentData1.push(...gen_elecData, ...course_guidesData, ...minorsData, ...deptData)
    // setContentData(contentData1)

    data = (
      <CustomTabs
        headerColor='primary'
        tabs={contentData1}
      />
    )
  }

  return (
    <div>
      <div className={classes.typo} style={{ marginTop: '-50px' }}>
        <h2><strong>STUDENT WELFARE DIVISION</strong></h2>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h4><strong>Know Your Academics</strong></h4>
      </div>

      <GridContainer direction='column' justify='center' alignItems='center'>

        <GridItem xs={12} sm={12} md={12}>

          {data}
        </GridItem>

      </GridContainer>

    </div>
  )
}

// items.data.map(content=>{
//     return(
//      <div>
//      <strong><h3 style={{display:"flex",justifyContent:'center'}}>{content.main_topic.toUpperCase()}</h3></strong>

//    {content.qa.map(qa=>{
//      return(<Accordion style={{marginTop:"5px",background:'#e8e8e8'}}>
//        <AccordionSummary
//          expandIcon={<ExpandMoreIcon />}
//          aria-controls="panel1a-content"
//          id="panel1a-header"

//        >
//           <b>{qa.q}</b>
//        </AccordionSummary>
//        <AccordionDetails style={{whiteSpace:'pre-wrap',fontSize:'17.5px',fontWeight:'400'}} >
//        <Autolinker text={qa.a}/>
//        </AccordionDetails>
//      </Accordion>)
//    })}
//   </div>
//     )
//   })
