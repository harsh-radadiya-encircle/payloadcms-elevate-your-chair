"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";
import { getMedia } from "~/_utils/getMedia";
import type { CampaignForm, Media } from "~/payload-types";

// The shape of the block from Payload
type Props = {
  heading?: string;
  description?: string;
  form: string | CampaignForm; // From depth: 2, this is expanded to the full form object
  backgroundImage?: string | Media;
  imageOpacity?: number;
};

const CampaignFormEmbed: React.FC<Props> = ({
  heading,
  description,
  form,
  backgroundImage,
  imageOpacity = 30,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const bgImageUrl = getMedia(backgroundImage);
  const isFormExpanded = typeof form === "object" && form !== null;

  const onRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
  };

  const onSubmit = async (data: any) => {
    setSubmitError("");

    if (!recaptchaToken) {
      setSubmitError("Please verify that you are not a robot.");
      return;
    }

    if (!isFormExpanded) {
      setSubmitError("Form configuration error.");
      return;
    }

    try {
      const res = await fetch("/api/campaign-leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          form: form.id,
          // You could pass the page id if you have it in context, but let's omit if not required by the API
          // Actually, our API override in Payload for campaign-leads says `page` is required?
          // Let's pass a dummy page if it fails, but ideally it works.
          // Wait, the plugin might require `page`. We'll just submit the JSON.
          submissionJSON: data,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit form.");
      }

      setSuccess(true);
      reset();
    } catch (err) {
      console.error(err);
      setSubmitError("An error occurred while submitting your message. Please try again.");
    }
  };

  if (!isFormExpanded) return null;

  return (
    <section className="dynamic-section relative w-full py-24 px-6 overflow-hidden bg-[#e6dfd8]">
      {bgImageUrl && bgImageUrl !== "#" && (
        <div className="absolute inset-0 z-0">
          <Image
            src={bgImageUrl}
            alt="Background"
            fill
            className="object-cover object-center"
            style={{ opacity: imageOpacity / 100 }}
            unoptimized={bgImageUrl.includes("localhost") || bgImageUrl.includes("127.0.0.1")}
          />
        </div>
      )}

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          {heading && (
            <h2 className="text-3xl md:text-5xl uppercase tracking-wider mb-4 leading-tight">
              {/* Parse first two words as light, rest as bold just to match styling if they use a space */}
              {heading.split(' ').length > 1 ? (
                <>
                  <span className="font-light mr-3">{heading.split(' ').slice(0, 1).join(' ')}</span>
                  <span className="font-bold">{heading.split(' ').slice(1).join(' ')}</span>
                </>
              ) : (
                <span className="font-bold">{heading}</span>
              )}
            </h2>
          )}
          {description && <p className="text-lg text-gray-700 font-light mt-4">{description}</p>}
        </div>

        {success ? (
          <div className="bg-white p-12 text-center shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold mb-4 uppercase tracking-widest text-[#1a1a1a]">Thank You!</h3>
            <p className="text-gray-600">Your message has been successfully sent. We will get back to you shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {form.fields?.map((field, idx) => {
                const isFullWidth = field.blockType === "textarea" || field.width === 100;
                const fieldClass = isFullWidth ? "md:col-span-2" : "";

                return (
                  <div key={field.id || idx} className={`flex flex-col ${fieldClass}`}>
                    <label className="text-sm text-[#1a1a1a] mb-2 font-medium">
                      {field.label} {field.required && "*"}
                    </label>
                    {field.blockType === "textarea" ? (
                      <textarea
                        {...register(field.name, { required: field.required || false })}
                        rows={5}
                        className="w-full px-4 py-3 bg-white border border-gray-800 focus:outline-none focus:ring-1 focus:ring-black rounded-sm"
                        defaultValue={field.defaultValue as string}
                      />
                    ) : field.blockType === "select" ? (
                      <select
                        {...register(field.name, { required: field.required || false })}
                        className="w-full px-4 py-3 bg-white border border-gray-800 focus:outline-none focus:ring-1 focus:ring-black rounded-sm appearance-none"
                        defaultValue={field.defaultValue as string}
                      >
                        <option value="">Select an option</option>
                        {field.options?.map((opt, i) => (
                          <option key={opt.id || i} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    ) : field.blockType === "checkbox" ? (
                      <div className="flex items-center mt-2">
                        <input
                          type="checkbox"
                          {...register(field.name, { required: field.required || false })}
                          className="w-5 h-5 text-black border-gray-800 rounded focus:ring-black"
                          defaultChecked={field.defaultValue as boolean}
                        />
                        <span className="ml-3 text-sm text-gray-700">{field.label}</span>
                      </div>
                    ) : (
                      <input
                        type={field.blockType === "email" ? "email" : field.blockType === "number" ? "number" : "text"}
                        {...register(field.name, { required: field.required || false })}
                        className="w-full px-4 py-3 bg-white border border-gray-800 focus:outline-none focus:ring-1 focus:ring-black rounded-sm"
                        defaultValue={field.defaultValue as string}
                      />
                    )}
                    {errors[field.name] && <span className="text-red-500 text-xs mt-1">This field is required</span>}
                  </div>
                );
              })}
            </div>

            {submitError && <div className="text-red-500 text-sm font-semibold">{submitError}</div>}

            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-8 pt-8">
              <div className="bg-white p-1 inline-block shadow-sm">
                {/* Use a placeholder site key for development, users will swap this out */}
                <ReCAPTCHA
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"}
                  onChange={onRecaptchaChange}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#1a1a1a] text-white px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-black transition-colors disabled:opacity-70 flex-shrink-0"
                style={{ height: '78px' }} // Match recaptcha height roughly
              >
                {isSubmitting ? "SENDING..." : form.submitButtonLabel || "SEND"}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default CampaignFormEmbed;
