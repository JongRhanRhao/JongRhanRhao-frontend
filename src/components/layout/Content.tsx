import { Routes, Route } from "react-router-dom";

import Dashboard from "@/pages/MenuPages/Dashboard";
import ReserveStatus from "@/pages/MenuPages/Reservations";
import StoreManagement from "@/pages/MenuPages/StoreManagement";
import NotFoundPage from "@/pages/NotFoundPage";
import { GLOBAL_URL_ROUTES } from "@/lib/variables";
import ProfileSetting from "@/pages/MenuPages/ProfileSetting";
import FeedbackPage from "@/pages/FeedbackPage";
import PrivacyAndPolicyPage from "@/pages/PrivacyAndPolicyPage";
import TermsOfServicePage from "@/pages/TermsOfServicePage";

const Content: React.FC = () => {
  return (
    <Routes>
      <Route
        path={`${GLOBAL_URL_ROUTES.landingPage}`}
        element={<Dashboard />}
      />
      <Route
        path={`${GLOBAL_URL_ROUTES.reserveStatus}`}
        element={<ReserveStatus />}
      />
      <Route
        path={`${GLOBAL_URL_ROUTES.storeManagement}`}
        element={<StoreManagement />}
      />
      <Route
        path={`${GLOBAL_URL_ROUTES.setting}`}
        element={<ProfileSetting />}
      />
      <Route path="/feedback" element={<FeedbackPage />} />
      <Route path="/privacy" element={<PrivacyAndPolicyPage />} />
      <Route path="/tos" element={<TermsOfServicePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Content;
