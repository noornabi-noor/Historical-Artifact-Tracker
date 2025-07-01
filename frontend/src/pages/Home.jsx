import React from 'react';
import Banner from '../components/Banner';
import FeaturedArtifacts from '../components/FeaturedArtifacts';
import Slider from '../components/Slider'
import CardArtifact from '../components/CardArtifact';
import HowItWorksArtifact from '../components/HowItWorksArtifact';
import FrequentlyAsk from '../components/FrequentlyAsk';


const Home = () => {
    return (
        <div>
            <Banner/>
            <Slider/>
            <FeaturedArtifacts/>
            <CardArtifact/>
            <HowItWorksArtifact/>
            <FrequentlyAsk/>
        </div>
    );
};

export default Home;