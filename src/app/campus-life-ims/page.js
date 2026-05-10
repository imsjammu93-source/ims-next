import GallerySection from '@/components/GallerySection'
import Layout from '@/layoutComponents/Layout'
import React from 'react'
import PageHeader from '@/layoutComponents/PageHeader'
import { assetsInfo } from '@/config/assetsInfo';

function CampusLifePage() {
  return (
   <Layout>
    <PageHeader 
      title="Campus Life" 
      subtitle="Explore the vibrant student community and excellence at IMS Jammu"
      bgImage={assetsInfo.campusPageHeaderImg}
    />
    <GallerySection/>
   </Layout>
  )
}

export default CampusLifePage;