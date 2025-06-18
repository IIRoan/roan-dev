"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, GraduationCap, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TimelineItem } from "@/types/events";
import { timelineData } from "@/data/events";

interface EducationSectionProps {
  isMobile: boolean;
}

export default function EducationSection({ isMobile }: EducationSectionProps) {
  return (
    <section className="relative min-h-screen w-full bg-zinc-950 px-4 md:px-8 py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(59, 130, 246, 0.3) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: isMobile ? "50px 50px" : "80px 80px",
          }}
        />
      </div>

      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/8 to-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-bl from-purple-500/8 to-pink-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto px-4 py-12 max-w-5xl">
        <motion.h1
          className="text-3xl md:text-4xl font-bold mb-2 text-center text-zinc-100"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Education & Experience
        </motion.h1>

        <motion.p
          className="text-zinc-400 text-center mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          My academic and professional development journey
        </motion.p>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-transparent z-0" />

          {timelineData.map((item, index) => {
            const isEducation = item.type === "education";
            const IconComponent = isEducation ? GraduationCap : Briefcase;

            return (
              <motion.div
                key={index}
                className={`mb-8 md:mb-12 relative z-10 flex flex-col ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-4 border-zinc-950 bg-gradient-to-br from-blue-500 to-purple-500 z-10">
                  <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-blue-400" />
                </div>

                <div
                  className={`md:w-1/2 flex ml-12 md:ml-0 ${
                    index % 2 === 0
                      ? "md:justify-end md:pr-8"
                      : "md:justify-start md:pl-8"
                  }`}
                >
                  <div className="mb-3 md:mb-0">
                    <Badge
                      variant="outline"
                      className="text-xs md:text-sm py-1 px-2 md:px-3 bg-blue-500/10 border-blue-500/30 text-blue-400"
                    >
                      <Calendar className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                      {item.period}
                    </Badge>
                  </div>
                </div>

                <div className={`md:w-1/2 ml-12 md:ml-0 ${index % 2 === 0 ? "md:pl-8" : "md:pr-8"}`}>
                  <motion.div
                    className="w-full relative"
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    {item.current && (
                      <div className="absolute -top-2 -right-2 z-20">
                        <div
                          className={`px-3 py-1 rounded-full text-xs font-medium text-white shadow-lg ${
                            isEducation
                              ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                              : "bg-gradient-to-r from-purple-500 to-pink-500"
                          }`}
                        >
                          Current
                        </div>
                      </div>
                    )}
                    
                    <Card className="overflow-hidden border-zinc-800/60 bg-zinc-900/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:border-zinc-700/60">
                      <CardContent className="p-4 md:p-6">
                        <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-4">
                          <div
                            className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                              isEducation
                                ? "bg-blue-500/20 border border-blue-500/30"
                                : "bg-purple-500/20 border border-purple-500/30"
                            }`}
                          >
                            <IconComponent
                              className={`w-4 h-4 md:w-5 md:h-5 ${
                                isEducation ? "text-blue-400" : "text-purple-400"
                              }`}
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg md:text-xl font-bold text-zinc-100 mb-1 leading-tight">
                              {item.title}
                            </h3>
                            <p className="text-zinc-300 font-medium mb-2 text-sm md:text-base">
                              {item.organization}
                            </p>
                            {item.description && (
                              <p className="text-zinc-400 text-xs md:text-sm leading-relaxed mb-3">
                                {item.description}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs">
                          <div className="flex items-center gap-2 md:gap-4">
                            {item.location && (
                              <div className="flex items-center gap-1 text-zinc-500">
                                <MapPin className="w-3 h-3" />
                                <span className="text-xs">{item.location}</span>
                              </div>
                            )}
                          </div>

                          <Badge
                            className={`self-start sm:self-auto ${
                              isEducation
                                ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                                : "bg-purple-500/10 text-purple-400 border-purple-500/20"
                            }`}
                          >
                            {isEducation ? "Education" : "Work"}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}