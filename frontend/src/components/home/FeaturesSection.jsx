// FeaturesSection.jsx
import { Brain, FileText, Palette } from "lucide-react"; // icons from lucide-react

export default function FeaturesSection() {
  return (
    <section className="text-[#0A1733] bg-white py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Get hired <span className="text-[#7ADAA5]">36% faster</span> with our
          feature-packed and easy-to-use resume builder app
        </h2>

        <p className="text-[#0A1733] mb-12">
          SmartResume is now part of Bold LLC. For more information visit
          our{" "}
          <a href="#" className="underline hover:text-[#7ADAA5]">
            Terms of Use
          </a>{" "}
          and{" "}
          <a href="#" className="underline hover:text-[#7ADAA5]">
            Privacy Policy
          </a>
          .
        </p>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-10 text-left md:text-center">
          {/* Feature 1 */}
          <div className="flex flex-col items-center md:items-center">
            <Brain className="text-[#7ADAA5] w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              Powerful resume builder
            </h3>
            <p className="text-[#0A1733]">
              Use our potent creation tools and expert guidance to create the
              perfect resume for your next job application.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center md:items-center">
            <FileText className="text-[#7ADAA5] w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              Professional templates
            </h3>
            <p className="text-[#0A1733]">
              Choose from 25+ applicant tracking systems (ATS)-friendly modern
              and professional templates.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center md:items-center">
            <Palette className="text-[#7ADAA5] w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              Customize fonts and colors
            </h3>
            <p className="text-[#0A1733]">
              Select custom fonts and colors on any resume template.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
