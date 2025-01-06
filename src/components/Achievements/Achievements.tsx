import React, { useState } from "react";
import { Award, ExternalLink } from "lucide-react";

const CertificatesShowcase = () => {
  const [selectedCertificate, setSelectedCertificate] = useState<Number>();

  const certificates = [
    {
      id: 1,
      title: "Data Science & Analytics",
      issuer: "UpGrad",
      date: "2023",
      imageUrl: "/assets/DS.png",
      description: "",
    },
    {
      id: 2,
      title: "Top Reader year 2024",
      issuer: "Daily.dev",
      date: "2024",
      imageUrl: "/assets/reader.png",
      description: "",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="mb-12">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
          Achievements & Certifications
        </h2>
        <p className="text-gray-400 mt-2">Milestones in my tech journey</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {certificates.map((certificate) => (
          <div
            key={certificate.id}
            className={`
              group relative rounded-xl
              bg-gradient-to-b from-slate-900/90 to-slate-900/70
              border border-slate-700 backdrop-blur-sm
              transition-all duration-500 ease-out
              hover:shadow-xl hover:shadow-teal-500/20
              ${
                selectedCertificate === certificate.id
                  ? "ring-2 ring-teal-500"
                  : ""
              }
            `}
            onClick={() => setSelectedCertificate(certificate.id)}
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />

            {/* Certificate content */}
            <div className="relative p-6 z-10">
              {/* Header */}
              <div className="flex items-center mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
                    <Award className="w-5 h-5 text-teal-400" />
                    {certificate.title}
                  </h3>
                  <p className="text-sm text-teal-400">
                    {certificate.issuer} • {certificate.date}
                  </p>
                </div>
              </div>

              {/* Certificate image */}
              <div className="relative group-hover:scale-[1.02] transition-transform duration-500 w-full flex justify-center">
                <img
                  src={certificate.imageUrl}
                  alt={certificate.title}
                  className=" rounded-xl shadow-lg object-cover h-[300px]"
                />
              </div>

              {/* Description */}
              {certificate.description && (
                <div className="mt-4">
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {certificate.description}
                  </p>
                </div>
              )}

              {/* Decorative elements */}
              <div className="absolute top-3 right-3 w-1.5 h-1.5 bg-teal-500 rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-500 delay-100" />
              <div className="absolute bottom-3 left-3 w-1.5 h-1.5 bg-blue-500 rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-500 delay-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertificatesShowcase;
