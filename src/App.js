import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.js';
import { GoogleOAuthProvider } from '@react-oauth/google';
import HCProtectedRoute from './components/HCProtectedRoute.js';
import HCLogin from './pages/HCLogin.js';
import HCHeader from './common/HCHeader.js';
import HCHome from './pages/HCHome.js';
import HCPostAddSchool from './pages/HCPostAddSchool.js';

import './styles/App.css';
import HCFooter from './common/HCFooter.js';
import HCSchool from './pages/HCSchool.js';
import HCPostAdd from './pages/HCPostAdd.js';
import HCAdminHome from './pages/HCAdminHome.js';
import HCAdminSchool from './pages/HCAdminSchool.js';
import HCAdminCreateSchool from './pages/HCAdminCreateSchool.js';
import HCAdminViewSchool from './pages/HCAdminViewSchool.js';
import HCToastContainer from './components/HCToastContainer.js';
import HCPostAddEvent from './pages/HCPostAddEvent.js';
import HCAdminEvent from './pages/HCAdminEvent.js';
import HCAdminViewEvent from './pages/HCAdminViewEvent.js';
import HCAdminCreateEvent from './pages/HCAdminCreateEvent.js';
import HCEvent from './pages/HCEvent.js';
import HCSchoolDetailPage from './pages/HCSchoolDetailPage.js';
import HCEventDetailPage from './pages/HCEventDetailPage.js';
import HCAdminRegistration from './pages/HCAdminRegistration.js';
import HCAdminViewRegistration from './pages/HCAdminViewRegistration.js';
import HCAdminCreateRegistration from './pages/HCAdminCreateRegistration.js';
import HCAdminContact from './pages/HCAdminContact.js';
import HCAdminViewContact from './pages/HCAdminViewContact.js';
import HCAdminCreateContact from './pages/HCAdminCreateContact.js';
import HCProfileDetail from './pages/HCProfileDetail.js';


function App() {
  return (
    <div className="App">
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <AuthProvider>
          <BrowserRouter>
              <HCHeader />
            <Routes>
              <Route 
                path='/login'
                element={<HCLogin/>}/>
              <Route 
                path='/'
                element={
                  <HCProtectedRoute>
                    <HCHome/>
                  </HCProtectedRoute>
                }/>
              <Route 
                path='/school'
                element={
                  <HCProtectedRoute>
                    <HCSchool/>
                  </HCProtectedRoute>
                }/>
              <Route 
                path='/school-detail/:id'
                element={
                  <HCProtectedRoute>
                    <HCSchoolDetailPage/>
                  </HCProtectedRoute>
                }/>
              <Route 
                path='/events'
                element={
                  <HCProtectedRoute>
                    <HCEvent/>
                  </HCProtectedRoute>
                }/>
              <Route 
                path='/event-detail/:id'
                element={
                  <HCProtectedRoute>
                    <HCEventDetailPage/>
                  </HCProtectedRoute>
                }/>
              <Route 
                path='/post-add'
                element={
                  <HCProtectedRoute>
                    <HCPostAdd/>
                  </HCProtectedRoute>
                }/>
              <Route 
                path='/post-add-school'
                element={
                  <HCProtectedRoute>
                    <HCPostAddSchool/>
                  </HCProtectedRoute>
                }/>
              <Route 
                path='/post-add-event'
                element={
                  <HCProtectedRoute>
                    <HCPostAddEvent/>
                  </HCProtectedRoute>
                }/>
              <Route 
                path='/profile-detail'
                element={
                  <HCProtectedRoute>
                    <HCProfileDetail/>
                  </HCProtectedRoute>
                }/>
              <Route 
                path='/admin-home'
                element={
                  <HCProtectedRoute>
                    <HCAdminHome/>
                  </HCProtectedRoute>
                }/>
              <Route 
                path='/admin-school'
                element={
                  <HCProtectedRoute>
                    <HCAdminSchool/>
                  </HCProtectedRoute>
                }/>
              <Route 
                path='/admin-event'
                element={
                  <HCProtectedRoute>
                    <HCAdminEvent/>
                  </HCProtectedRoute>
                }/>
              <Route 
                path='/admin-registration'
                element={
                  <HCProtectedRoute>
                    <HCAdminRegistration/>
                  </HCProtectedRoute>
                }/>
              <Route 
                path='/admin-contact'
                element={
                  <HCProtectedRoute>
                    <HCAdminContact/>
                  </HCProtectedRoute>
                }/>
              <Route 
                path='/admin-create-school'
                element={
                  <HCProtectedRoute>
                    <HCAdminCreateSchool/>
                  </HCProtectedRoute>
                }/>
              <Route 
                path='/admin-create-event'
                element={
                  <HCProtectedRoute>
                    <HCAdminCreateEvent/>
                  </HCProtectedRoute>
                }/>
              <Route 
                path='/admin-create-registration'
                element={
                  <HCProtectedRoute>
                    <HCAdminCreateRegistration/>
                  </HCProtectedRoute>
                }/>
              <Route 
                path='/admin-create-contact'
                element={
                  <HCProtectedRoute>
                    <HCAdminCreateContact/>
                  </HCProtectedRoute>
                }/>
              <Route 
                path='/admin-view-school/:id'
                element={
                  <HCProtectedRoute>
                    <HCAdminViewSchool/>
                  </HCProtectedRoute>
                }/>
              <Route 
                path='/admin-view-event/:id'
                element={
                  <HCProtectedRoute>
                    <HCAdminViewEvent/>
                  </HCProtectedRoute>
                }/>
              <Route 
                path='/admin-view-registration/:id'
                element={
                  <HCProtectedRoute>
                    <HCAdminViewRegistration/>
                  </HCProtectedRoute>
                }/>
              <Route 
                path='/admin-view-contact/:id'
                element={
                  <HCProtectedRoute>
                    <HCAdminViewContact/>
                  </HCProtectedRoute>
                }/>
            </Routes>
            <HCToastContainer />
            <HCFooter />
          </BrowserRouter>
        </AuthProvider>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
