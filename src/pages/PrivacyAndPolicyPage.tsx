const PrivacyAndPolicyPage = () => {
  return (
    <>
      <div className="p-6 mx-auto rounded-lg shadow-lg text-text">
        <h1 className="mb-6 text-3xl font-bold text-center text-primary">
          Privacy Policy
        </h1>
        <p className="text-center text-text/50">
          Updated on {new Date().toLocaleDateString()}
        </p>
        <div className="divider"></div>
        <section className="mb-8">
          <p className="mb-4">
            JongRhanRhao (the "Platform"), owned and operated by JongRhanRhao
            Corporation (the "Company"), respects and values your privacy. This
            Privacy Policy explains how we collect, use, and share personally
            identifiable information ("PII") when you use our Platform and
            services.
          </p>
          <p className="mb-4">
            By using JongRhanRhao, you agree to the collection and use of your
            information as outlined in this policy. If you do not agree with our
            policies, please refrain from using our services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-primary">
            Scope of Policy
          </h2>
          <p>
            This Privacy Policy applies solely to the use of the JongRhanRhao
            Platform. It does not cover third-party services or websites that
            may be linked from or integrated with the Platform. Users are
            encouraged to review the privacy policies of any third-party service
            before use.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-primary">
            Information We Collect
          </h2>
          <p className="mb-2">
            To provide our services, we may collect the following PII:
          </p>
          <ul className="pl-6 mb-4 list-disc">
            <li>
              Direct Identifiable Information: Name, age, nationality, date of
              birth.
            </li>
            <li>Contact Information: Address, phone number, email address.</li>
            <li>Payment Information: Payment transaction data.</li>
            <li>
              Transactional Data: Username, password, transaction history, and
              preferences based on service usage.
            </li>
            <li>
              Technical Information: IP address, browser settings, service usage
              information.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-primary">
            How We Use Your Information
          </h2>
          <p className="mb-2">We collect and use your PII to:</p>
          <ol className="pl-6 mb-4 list-decimal">
            <li>Verify your identity and eligibility.</li>
            <li>Process and monitor transactions.</li>
            <li>Contact you regarding your bookings or Platform updates.</li>
            <li>
              Analyze your preferences to deliver personalized content and
              offers.
            </li>
            <li>
              Comply with legal obligations, including tax and regulatory
              requirements.
            </li>
            <li>
              Provide after-sale services such as customer support or
              satisfaction surveys.
            </li>
          </ol>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-primary">
            Lawful Bases for Processing
          </h2>
          <p className="mb-2">
            We process your PII under the following legal bases:
          </p>
          <ul className="pl-6 mb-4 list-disc">
            <li>Contractual necessity to provide services.</li>
            <li>Compliance with legal obligations.</li>
            <li>Legitimate business interests.</li>
            <li>Consent, where required.</li>
          </ul>
          <p>
            If you choose not to provide certain PII, you may be unable to
            access some of our services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-primary">
            Data Retention
          </h2>
          <p>
            We will store your PII as long as you maintain an account on the
            Platform and for up to 3 years after account termination unless
            otherwise required by law.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-primary">
            Disclosure of Information
          </h2>
          <p className="mb-2">
            We may disclose your PII in the following circumstances:
          </p>
          <ol className="pl-6 mb-4 list-decimal">
            <li>To event organizers for verification purposes.</li>
            <li>
              To third-party service providers (e.g., cloud storage providers
              like AWS, logistics services) strictly on a need-to-know basis.
            </li>
            <li>
              To legal authorities if required by law or to protect the
              Company's rights and prevent fraud.
            </li>
          </ol>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-primary">
            Security Measures
          </h2>
          <p>
            We implement the "Privacy-by-Design" principle and use the best
            available security measures to protect your PII from unauthorized
            access, alteration, or disclosure. These measures are regularly
            reviewed to comply with industry standards and legal requirements.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-primary">
            User Rights
          </h2>
          <p className="mb-2">
            As a user, you have the following rights regarding your PII:
          </p>
          <ul className="pl-6 mb-4 list-disc">
            <li>
              Right to Withdraw Consent: You can withdraw your consent at any
              time.
            </li>
            <li>Right of Access: You may request a copy of your PII.</li>
            <li>
              Right to Rectification: You can request corrections to inaccurate
              or incomplete PII.
            </li>
            <li>
              Right to Restriction of Processing: You can request limited use of
              your PII.
            </li>
            <li>
              Right to Object: You can object to PII processing based on
              legitimate interests.
            </li>
            <li>
              Right to Data Portability: You may request to transfer your data
              to another service.
            </li>
            <li>
              Right to Erasure: You can request data deletion under certain
              conditions.
            </li>
            <li>
              Right Not to Be Subject to Automated Decisions: You are entitled
              to challenge decisions made solely by automated processes.
            </li>
          </ul>
          <p>
            To exercise any of these rights, contact us directly. We will
            respond within 30 days of receiving a valid request.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-primary">Cookies</h2>
          <p className="mb-2">
            We use cookies to enhance your experience on the Platform. Cookies
            are small text files stored on your browser to track your
            preferences, site interactions, and activity. The types of cookies
            we use include:
          </p>
          <ul className="pl-6 mb-4 list-disc">
            <li>
              Functionality Cookies: Store your settings like language
              preferences.
            </li>
            <li>
              Advertising Cookies: Track on-site behavior to provide tailored
              services and products.
            </li>
            <li>
              Strictly Necessary Cookies: Essential for navigating and using key
              features of the Platform.
            </li>
          </ul>
          <p>
            You may disable cookies in your browser settings, but doing so may
            affect the functionality of the Platform.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-primary">
            Updates to This Policy
          </h2>
          <p className="mb-4">
            We may amend this Privacy Policy at any time to reflect legal
            requirements or Platform changes. Any updates will be communicated
            via the Platform, and continued use constitutes acceptance of the
            updated policy.
          </p>
          <p className="mb-4">
            If you have questions or concerns regarding this Privacy Policy,
            please contact us at support@jongrhanrhao.com.
          </p>
          <p>
            This privacy policy ensures compliance with applicable laws and
            outlines the rights and responsibilities regarding the handling of
            personal information.
          </p>
        </section>
      </div>
    </>
  );
};

export default PrivacyAndPolicyPage;
