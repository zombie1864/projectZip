import Example from '../assets/img/Example.png'
import Example2 from '../assets/img/Example2.png'
import Example3 from '../assets/img/Example3.png'


export let imgSlides = [
    {
        imgSrc: Example, 
        projTitle: 'NOAA data acquisition',
        desc: "A command line interface that simulates a realistic data acquistion phase for data science applications. This project provides clean and aggregated datasets collected from the National Oceanic and Atmospheric Administration, NOAA, that can be ran to data pipelines for further analysis. Datasets from NOAA are used for weather related studies either on buildings, energy efficient products, or climate change analysis.",
        alt: 1,
        srcCode: 'https://github.com/zombie1864/noaa_data_acquisition',
        purpose: 'Government and other public services provide data using FTP (file transfer protocol) servers; often time with encrypted data. This project collects ISD (Integrated Surface Data) which are encrypted datasets that provides large amounts of information at the cost of usability. Several algorithms parse the ISD to decode the information into  raw datasets which are then aggregated and stored in CSV and JSON format for further processing.',
        technologyUsed: ['python', 'pytest', 'pydantic', 'click', 'requests'],
        AoA: 'Climate change research, product efficiency research, building EUI (Energy Use Intensity) reports',
    },
    {
        imgSrc: Example2, 
        projTitle: 'Data I/O Aggregation',
        desc: "A command line interface that aggregates data from local JSON file and JSON file from REST API. This utilizes pythons ability to handle I/O bound problems to properly generate outputs based on user inputs.",
        alt: 2,
        srcCode: 'https://github.com/zombie1864',
        purpose: 'Python provides numerous methodologies to handle file management for production level demands. This projects aims to simulate internal users demand for formated data with user input to output data that suites their needs. In many situations users require to pull data, in a specific format, that requires interacting with a REST API. To enhance user experiance and reusability this project provies API that interacts with either local data or data from REST API servers.',
        technologyUsed: ['python', 'pytest', 'click', 'requests'],
        AoA: 'data science application',
    },
    {
        imgSrc: Example3, 
        projTitle: 'DSnA',
        desc: "Lorem ipsum 3 dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        alt: 3,
        srcCode: 'https://github.com/zombie1864',
        purpose: 'perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
        technologyUsed: ['python', 'pytest'],
        AoA: 'Academic',
    },
 ];