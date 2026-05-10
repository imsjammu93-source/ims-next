'use client';
import React, { useState } from 'react';
import Layout from '@/layoutComponents/Layout';
import PageHeader from '@/layoutComponents/PageHeader';
import QuickLinksCard from '@/components/QuickLinksCard';
import '@/assets/css/alumni.css';
import { assetsInfo } from '@/config/assetsInfo';

const placementData = [
  { name: "SALMAN SHEIKH", batch: "2007-2010", stream: "BBA", designation: "BUSINESS BANKING", organisation: "EMIRATES ISLAMIC BANK – UAE" },
  { name: "ANKUSH", batch: "2008-2010", stream: "MBA", designation: "TEAM MANAGER", organisation: "AMAZON" },
  { name: "SAMIR MAHAJAN", batch: "2008-2010", stream: "MBA", designation: "ASSISTANT MANAGER", organisation: "UCO BANK" },
  { name: "ROBINA ABROL", batch: "2008-2010", stream: "MBA", designation: "ASSISTANT MANAGER", organisation: "APOLLO MUNICH HEALTH INSURANCE" },
  { name: "PEER ALTAF", batch: "2008-2009", stream: "MBA", designation: "NRI RELATIONSHIP MANAGER", organisation: "AXIS BANK" },
  { name: "PRIYANKA YADAV", batch: "2008-2010", stream: "MBA", designation: "ASST. MANAGER", organisation: "CAP GEMINI" },
  { name: "MANISH SHARMA", batch: "2008-2010", stream: "MBA", designation: "RAM ENGINEER", organisation: "ERICSSON" },
  { name: "MANVI RAINA", batch: "2008-2010", stream: "MBA", designation: "PO", organisation: "SBI BANK" },
  { name: "AMAN GUPTA", batch: "2008-2010", stream: "MBA", designation: "AREA MANAGER", organisation: "CIPLA" },
  { name: "SAVITA KUMARI SHARMA", batch: "2008-2010", stream: "MBA", designation: "ASST. MANAGER", organisation: "CANARA BANK" },
  { name: "KAILASH SINGH JAMWAL", batch: "2008-2010", stream: "MBA", designation: "PO", organisation: "JK BANK HIRANAGAR" },
  { name: "ANKUSH GUPTA", batch: "2008-2010", stream: "MBA", designation: "ASST. MANAGER", organisation: "IBM - CONCENTRIX INDIA" },
  { name: "PRANAV DUBEY", batch: "2008-2010", stream: "MBA", designation: "PO", organisation: "JK BANK" },
  { name: "AMIT SINGH", batch: "2008-2010", stream: "MBA", designation: "ASST. MANAGER", organisation: "CERA" },
  { name: "MANISH ANAND", batch: "2008-2010", stream: "MBA", designation: "TERRITORY MANAGER", organisation: "LIVGUARD" },
  { name: "SHAMLAL CHOUDHARY", batch: "2008-2010", stream: "MBA", designation: "ASM", organisation: "MARICO LTD." },
  { name: "PRANAV GUPTA", batch: "2008-2011", stream: "BBA", designation: "BRANCH MANAGER", organisation: "ICICI PRUDENTIAL MUTUAL FUND" },
  { name: "AMBISHA SACHDEVA", batch: "2008-2010", stream: "MBA", designation: "HR MANAGER", organisation: "GLAXOSMITHKLINE" },
  { name: "BASHARAT HUSSAIN SHAH", batch: "2009-2011", stream: "MBA", designation: "AREA EXECUTIVE", organisation: "ITC LIMITED" },
  { name: "VIJAY KUMAR LANGEH", batch: "2009-2011", stream: "MBA", designation: "SENIOR HR", organisation: "SYSKA" },
  { name: "ROMIT SODI", batch: "2009-2011", stream: "MBA", designation: "PROJECT COORDINATOR", organisation: "TATA GROUP" },
  { name: "INDER PAL SINGH", batch: "2009-2011", stream: "MBA", designation: "OFFICER FINANCE", organisation: "UFLEX LIMITED" },
  { name: "ADITYA SHARMA", batch: "2009-2011", stream: "MBA", designation: "EXECUTIVE - FOOD SERVICES", organisation: "MCCAIN FOODS INDIA PVT LTD" },
  { name: "ANKIT BAKSHI", batch: "2009-2011", stream: "MBA", designation: "FIELD SALES CAPABILITY", organisation: "HINDUSTAN UNILEVER LIMITED" },
  { name: "ADITYA MAHAJAN", batch: "2009-2011", stream: "MBA", designation: "MANAGER", organisation: "UNION BANK OF INDIA" },
  { name: "ANKUSH SHARMA", batch: "2009-2011", stream: "MBA", designation: "REGIONAL MANAGER", organisation: "SERVOKON SYSTEMS LTD." },
  { name: "SAHIL MAHAJAN", batch: "2009-2011", stream: "MBA", designation: "EXECUTIVE ASSOCIATE", organisation: "JK BANK" },
  { name: "RISHI KUMAR", batch: "2009-2012", stream: "BCA", designation: "BRANCH MANAGER", organisation: "INDUSIND BANK" },
  { name: "MOHIT SHARMA", batch: "2009-2011", stream: "BBA", designation: "DEPUTY MANAGER", organisation: "AXIS BANK" },
  { name: "ROCKY BINDROO", batch: "2010-2012", stream: "MBA", designation: "AREA SALES MANAGER", organisation: "KAJARIA CERAMICS LTD" },
  { name: "MANPREET KAUR SODHI", batch: "2010-2012", stream: "MBA", designation: "SENIOR OPERATIONS MANAGER", organisation: "IMMIGRATION ADVISERS NZ LTD" },
  { name: "SANDEEP SHARMA", batch: "2010-2012", stream: "MBA", designation: "AREA SALES MANAGER", organisation: "JAQUAR & CO. PVT. LTD." },
  { name: "SUNIL SACHDEVA", batch: "2011-2013", stream: "MBA", designation: "ASST. MANAGER", organisation: "IDBI BANK, PUNJAB" },
  { name: "UJJWAL JALOTRA", batch: "2011-2014", stream: "BBA", designation: "TERITORY SALES MANAGER", organisation: "BHARTI AIRTEL" },
  { name: "NIRMAL KUMAR", batch: "2011-2013", stream: "MBA", designation: "TELLER", organisation: "INDUSIND BANK LTD" },
  { name: "PREETI RAINA", batch: "2013-2015", stream: "MBA", designation: "VALUE BANKER", organisation: "ICICI BANK" },
  { name: "RUHI PANDITA", batch: "2013-2015", stream: "MBA", designation: "HR MANAGER", organisation: "TATA MOTORS" },
  { name: "ANKUSH KHAJURIA", batch: "2013-2025", stream: "MBA", designation: "ASST. ASM", organisation: "ASIAN GRANITO INDIA LTD" },
  { name: "ROHIT BAMBRA", batch: "2013-2015", stream: "MBA", designation: "RELATIONSHIP MANAGER", organisation: "KARVY STOCK BROKING" },
  { name: "VIDISHA RAINA", batch: "2013-2015", stream: "MBA", designation: "AM", organisation: "UFLEX" },
  { name: "BHANU PRATAP SINGH", batch: "2013-2015", stream: "MBA", designation: "BRANCH MANAGER", organisation: "HDFC SECURITIES" },
  { name: "WASIM AKHTAR", batch: "2013-2015", stream: "MBA", designation: "BRANCH MANAGER", organisation: "BOMBAY STOCK EXCHANGE" },
  { name: "SHIVANI JAMWAL", batch: "2014-2016", stream: "MBA", designation: "CSO AND SDO", organisation: "RELIANCE GENERAL INSURANCE" },
  { name: "ARZOO MAHAJAN", batch: "2014-2015", stream: "MBA", designation: "ASST. MANAGER", organisation: "HDFC BANK" },
  { name: "NIKHIL", batch: "2014-2016", stream: "MBA", designation: "MANAGER", organisation: "BATA INDIA LTD." },
  { name: "CHETAN JAMWAL", batch: "2014-2017", stream: "BBA", designation: "ASSOCIATE", organisation: "EUREKA FORBES" },
  { name: "ROHIT KUMAR", batch: "2015-2018", stream: "BBA", designation: "RELATIONSHIP MANAGER", organisation: "TOYOTA" },
  { name: "SHUBANGI", batch: "2015-2017", stream: "MBA", designation: "OPERATIONS ANALYST", organisation: "HDFC BANK" },
  { name: "SONIA", batch: "2015-2017", stream: "MBA", designation: "HR COORDINATOR", organisation: "RADISSON BLU" },
  { name: "SHUBAM SAWHNEY", batch: "2015-2017", stream: "MBA", designation: "ASST. MANAGER", organisation: "CEASEFIRE INDUSTRIES" },
  { name: "NEEL SAGAR MENGI", batch: "2015-2017", stream: "MBA", designation: "RELATIONSHIP EXECUTIVE", organisation: "J&K BANK" },
  { name: "ESHAN SHARMA", batch: "2015-2017", stream: "MBA", designation: "BDA ATL", organisation: "WALMART INDIA" },
  { name: "KULBHUSHAN RAINA", batch: "2015-2017", stream: "MBA", designation: "PROCESS ASSOCIATE", organisation: "GENPACT" },
  { name: "AMAR MUSSA", batch: "2016-2018", stream: "MBA", designation: "FINANCIAL SERVICE CONSULTANT", organisation: "ICICI PRUDENTIAL" },
  { name: "ROSHNI ARORA", batch: "2016-2018", stream: "MBA", designation: "FINANCIAL CONSULTANT", organisation: "ICICI PRUDENTIAL" },
  { name: "LOTIKA PURI", batch: "2016-2018", stream: "MBA", designation: "FINANCE SERVICE CONSULTANT", organisation: "ICICI PRUDENTIAL" },
  { name: "AMAR DEEP SINGH", batch: "2016-2018", stream: "MBA", designation: "DIRECT SALES EXECUTIVE", organisation: "ASIAN PAINTS LTD" },
  { name: "SONALI GUPTA", batch: "2016-2018", stream: "MBA", designation: "OPERATIONS EXECUTIVE", organisation: "FOODPANDA" },
  { name: "MONIKA BHAT", batch: "2016-2018", stream: "MBA", designation: "HR RECRUITER", organisation: "ASSAN JOBS PVT LTD" },
  { name: "SHUBHANGI CHOUHAN", batch: "2016-2018", stream: "MBA", designation: "FINANCIAL CONSULTANT", organisation: "ICICI PRUDENTIAL" },
  { name: "VIKRANT SLATHIA", batch: "2016-2018", stream: "MBA", designation: "SALES REPRESENTATIVE", organisation: "AMBUJA CEMENT" },
];

function AlumniPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('ALL');

  const filteredData = placementData.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.organisation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.designation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'ALL' || item.stream === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <Layout>
      <PageHeader
        title="Alumni & Placements"
        subtitle="A legacy of leadership at the world's most prestigious organizations."
        bgImage={assetsInfo.requirterPageHeader}
      />

      <main className="alumni-page py-5">
        <section className="container">
          <div className="row">
            <div className="col-lg-12">
              
              {/* Placement Stats Highlights */}
              <div className="alumni-stats-grid">
                <div className="alumni-stat-card">
                  <div className="stat-icon"><i className="fas fa-handshake" /></div>
                  <h3>500+</h3>
                  <p>Corporate Partners</p>
                </div>
                <div className="alumni-stat-card">
                  <div className="stat-icon"><i className="fas fa-users" /></div>
                  <h3>15,000+</h3>
                  <p>Success Stories</p>
                </div>
                <div className="alumni-stat-card">
                  <div className="stat-icon"><i className="fas fa-trophy" /></div>
                  <h3>90%</h3>
                  <p>Placement Record</p>
                </div>
              </div>

              {/* Trusted By Recruiters Ticker */}
              {/* <div className="recruiter-marquee">
                <div className="marquee-title">Top Global Recruiters</div>
                <div className="marquee-grid">
                  <div className="marquee-item"><img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" /></div>
                  <div className="marquee-item"><img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/HDFC_Bank_Logo.svg" alt="HDFC" /></div>
                  <div className="marquee-item"><img src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" alt="IBM" /></div>
                  <div className="marquee-item"><img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_logo.svg" alt="TATA" /></div>
                  <div className="marquee-item"><img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Hindustan_Unilever.svg" alt="HUL" /></div>
                  <div className="marquee-item"><img src="https://upload.wikimedia.org/wikipedia/commons/1/15/Icici_bank_logo.svg" alt="ICICI" /></div>
                </div>
              </div> */}

              {/* Dashboard Header */}
              <div className="placement-header mb-4 text-center">
                <div className="section-label">Placement Directory</div>
                <h2 className="section-title">Where Our <span>Alumni Shine</span></h2>
              </div>

              {/* Search & Filters */}
              <div className="alumni-controls">
                <div className="alumni-tabs">
                  {['ALL', 'MBA', 'BBA', 'BCA'].map(tab => (
                    <button 
                      key={tab} 
                      className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <div className="alumni-search">
                  <i className="fas fa-search" />
                  <input 
                    type="text" 
                    placeholder="Search by name, company or job title..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Table UI */}
              <div className="alumni-table-container">
                <table className="alumni-table">
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Student Name</th>
                      <th>Batch</th>
                      <th>Stream</th>
                      <th>Designation</th>
                      <th>Organisation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.length > 0 ? (
                      filteredData.map((alumnus, idx) => (
                        <tr key={idx}>
                          <td className="s-no">{idx + 1}</td>
                          <td className="fw-bold text-dark">{alumnus.name}</td>
                          <td>{alumnus.batch}</td>
                          <td><span className={`stream-tag ${alumnus.stream.toLowerCase()}`}>{alumnus.stream}</span></td>
                          <td>{alumnus.designation}</td>
                          <td className="org-name">{alumnus.organisation}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6">
                          <div className="no-results">
                            <i className="fas fa-search-minus fa-3x" />
                            <p className="mt-3">No matching alumni records found.</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default AlumniPage;