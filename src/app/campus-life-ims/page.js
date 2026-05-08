import GallerySection from '@/components/GallerySection'
import Layout from '@/layoutComponents/Layout'
import React from 'react'
import PageHeader from '@/layoutComponents/PageHeader'

function CampusLifePage() {
  return (
   <Layout>
    <PageHeader 
      title="Campus Life" 
      subtitle="Explore the vibrant student community and excellence at IMS Jammu"
    />
    <GallerySection/>
   </Layout>
  )
}

export default CampusLifePage;