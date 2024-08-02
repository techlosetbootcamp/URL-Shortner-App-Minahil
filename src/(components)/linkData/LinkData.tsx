"use client";
import { GrAdd, GrEdit } from "react-icons/gr";
import { AiOutlineDelete } from "react-icons/ai";
import imgFile from "/public/assets/images/linkly.svg";
import { FaArrowDown, FaArrowDown19, FaCopy } from "react-icons/fa6";
import { FaLink } from "react-icons/fa6";
import { FaLinkSlash } from "react-icons/fa6";
import Image from "next/image";
import useLinkData from "./useLinkData";
import { CiFilter } from "react-icons/ci";
import Filter from "../filter/Filter";
import Link from "next/link";
import Loader from "../loader/Loader";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const LinkTable = () => {
  const {
    url,
    handleCopy,
    handleToggleStatus,
    formatDate,
    handleEdit,
    handleDelete,
    loading,
    handleFilterChange,
    filteredLinks,
    expandedIndex,toggleDetails
  } = useLinkData();

  if (url.isLoading) return <Loader />;

  return (
    <>
      {url?.urls![0]?.user_email && (
        <div className="flex items-center justify-between mb-[28px] ml-[10px]">
          <div className="text-text_secondary font-bold text-[20px]">
            History <span>({filteredLinks?.length})</span>
          </div>
          <div className="flex items-center gap-[10px]">
            <Link href="/url/add">
              <button className="flex items-center justify-center gap-[10px] text-input_txt_clr font-bold text-[15px] bg-brand_grey rounded-full border border-input_border_clr py-[15px] md:py-[9px] pr-[25.19px] pl-[25px]">
                <div className="hidden md:flex">Custom Slug</div>
                <GrAdd />
              </button>
            </Link>
            <div className="cursor-pointer bg-brand_grey border border-input_border_clr h-[44px] text-input_txt_clr font-bold text-[15px] rounded-[48px] hidden sm:flex items-center justify-center py-[21px] w-[113.19px] pr-[25.19px] pl-[25px] gap-[10px]">
              <CiFilter />
              <Filter onFilterChange={handleFilterChange} />
            </div>
          </div>
        </div>
      )}

      <div className="hidden md:flex lg:mx-[40px] rounded-t-[10px] xxl:mx-0 overflow-x-auto">
        <table
          className="min-w-full rounded-md"
          style={{ borderCollapse: "separate", borderSpacing: "0 3px" }}
        >
          <thead className="w-full">
            <tr className="text-text_secondary text-[15px] md:py-[10px] xl:py-[21px] pr-[25.19px] pl-[25px] bg-input_bg_clr">
              <th className="md:py-[10px] xl:py-[21px] pl-[25px] text-left">Short Link</th>
              <th className="md:py-[10px] xl:py-[21px] text-left">Original Link</th>
              <th className="md:py-[10px] xl:py-[21px] text-left">QR Code</th>
              <th className="md:py-[10px] xl:py-[21px] text-left">Clicks</th>
              <th className="md:py-[10px] xl:py-[21px] text-left">Status</th>
              <th className="md:py-[10px] xl:py-[21px] pr-[25.19px] text-left">Date</th>
              {url?.urls![0]?.user_email && (
                <th className="pr-[25.19px] text-left">Action</th>
              )}
            </tr>
          </thead>
          <tbody>
            {filteredLinks?.map((link) => (
              <tr
                key={link.urlCode}
                className="text-text_secondary md:text-[12px] lg:text-[14px] text-[14px] md:py-[10px] xl:py-[21px] pr-[25.19px] pl-[25px] xxl:backdrop-blur-[22px] backdrop-blur-[12px] bg-brand_grey"
                style={{
                  backgroundColor: "rgba(24, 30, 41, 0.22)",

                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.10)",
                  marginTop: "3px",
                }}
              >
                <td className="pl-[25px] md:py-[10px] xxl:py-[21px]">
                  <div className="flex items-center gap-[10px]">
                    <div className="font-bold text-ellipsis truncate md:max-w-[150px] lg:max-w-[250px] xxl:max-w-[300px]">{link.shortUrl}</div>
                    <div className="h-[35px] lg:h-[35px] md:h-[30px] py-[3.5px] px-[10px] flex items-center justify-center w-[35px] lg:w-[35px] md:w-[30px] rounded-[31px] bg-copy_button_clr opacity-[69%]">
                      <FaCopy
                        onClick={() => handleCopy(link?.shortUrl!)}
                        className="cursor-pointer h-[28px] w-[15px] md:h-[23px] md:w-[10px] lg:h-[28px] lg:w-[15px] "
                      />
                    </div>
                  </div>
                </td>
                <td className="md:py-[10px] xxl:py-[21px]">
                  <div className="flex items-center gap-[10px]">
                    <div className="h-[32px] w-[32px] md:h-[22px] md:w-[22px] lg:h-[32px] lg:w-[32px] flex items-center justify-center rounded-[4px]">
                      <Image
                        src={link?.iconImg || imgFile}
                        alt="src"
                        width={32}
                        height={32}
                      />
                    </div>
                    <div className="font-bold md:max-w-[150px] xxl:max-w-[300px] text-ellipsis truncate ">
                      {link?.originalUrl}
                    </div>
                  </div>
                </td>
                <td className="md:py-[10px] xl:py-[21px]">
                  {link.qrCode && (
                    <div className="h-[32px] w-[32px] md:h-[22px] md:w-[22px] lg:h-[32px] lg:w-[32px]">
                    <a href={link.qrCode} download>
                      <Image src={link.qrCode} alt="" width={32} height={32} />
                    </a>
                    </div>
                  )}
                </td>
                <td className="md:py-[10px] xl:py-[21px]">
                  {link.analytics?.analytic?.clicked}
                </td>
                <td
                
                  onClick={() =>
                    handleToggleStatus(link?.urlCode!, link?.active!)
                  }
                  className="md:py-[10px] xl:py-[21px] "
                >
                  <div className="cursor-pointer flex gap-[10px] lg:gap-[10px] md:gap-[5px] items-center justify-center">
                  <div
                    className={`${
                      link.active
                        ? "text-active_link_clr"
                        : "text-inactive_link_clr"
                    } font-thin`}
                  >
                    {link.active ? "Active" : "Inactive"}
                  </div>
                  <div
                    className={`h-[35px] w-[35px] lg:h-[35px] lg:w-[35px] md:h-[25px] md:w-[25px] rounded-[31px] px-[8px] py-[3.5px] ${
                      link?.active
                        ? "bg-active_link_clr"
                        : "bg-inactive_link_clr"
                    } opacity-15 flex items-center justify-center`}
                  >
                    {link?.active ? (
                      <FaLink className="text-white" />
                    ) : (
                      <FaLinkSlash className="text-white" />
                    )}
                  </div>
                  </div>
                 
                </td>
                <td className="md:py-[10px] xl:py-[21px] pr-[25.19px]">
                  {formatDate(link?.analytics?.analytic.updatedAt!)}
                </td>
                {link?.user_email && (
                  <td className="md:py-[10px] xl:py-[21px] pr-[25.19px]">
                    <div className="flex items-center gap-[10px]">
                      <button
                        style={{
                          filter:
                            "drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.10))",
                        }}
                        className="flex items-center justify-center py-[13px] px-[13.09px] border border-input_border_clr bg-input_bg_clr rounded-[48px]"
                        onClick={() => handleEdit(link?.urlCode!)}
                      >
                        <GrEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(link?.urlCode!)}
                        disabled={loading}
                        className="flex items-center justify-center py-[13px] px-[13.09px] border border-input_border_clr bg-input_bg_clr rounded-[48px]"
                      >
                        <AiOutlineDelete />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile View */}
      <div className="md:hidden">
        <div className="text-text_secondary text-[15px] font-bold rounded-t-[10px] py-[21px] pr-[25.19px] pl-[25px] bg-input_bg_clr">
          Shorten Links
        </div>
        <div>
          {filteredLinks?.map((link, index) => (
            <div
              key={link?.urlCode}
              style={{
                backgroundColor: "rgba(24, 30, 41, 0.22)",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.10)",
                marginTop: "3px",
              }}
              className="py-[14px] pr-[10px] pl-[25px] xxl:backdrop-blur-[22px] backdrop-blur-[12px]"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-[10px] text-text_secondary">
                  <div className="font-bold max-w-[130px] sm:max-w-[156px] text-ellipsis truncate">
                    {link?.shortUrl}
                  </div>
                  <div className="h-[35px] py-[3.5px] px-[10px] flex items-center justify-center w-[35px] rounded-[31px] bg-copy_button_clr opacity-[69%]">
                    <FaCopy
                      onClick={() => handleCopy(link?.shortUrl!)}
                      className="cursor-pointer h-[28px] w-[15px]"
                    />
                  </div>
                </div>
                <div>
                  <button
                    className="text-text_secondary bg-copy_button_clr opacity-[69%] flex items-center justify-center w-[35px] h-[35px] rounded-[31px]"
                    onClick={() => toggleDetails(index)}
                  >
                    {expandedIndex === index ? <IoIosArrowUp /> : <IoIosArrowDown />}
                  </button>
                </div>
              </div>
              {expandedIndex === index && (
                <div className="mt-[10px] text-text_secondary">
                  <div>
                    <strong>Original Link:</strong> <div className="max-w-[170px] text-ellipsis truncate">{link?.originalUrl}</div>
                  </div>
                  <div>
                    <strong>Clicks:</strong> {link.analytics?.analytic?.clicked}
                  </div>
                  <div>
                    <strong>Status:</strong>{" "}
                    <span
                      className={`${
                        link.active ? "text-active_link_clr" : "text-inactive_link_clr"
                      }`}
                    >
                      {link.active ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <div>
                    <strong>Date:</strong>{" "}
                    {formatDate(link?.analytics?.analytic.updatedAt!)}
                  </div>
                  {link?.user_email && (
                  <div className="flex items-center gap-[10px] mt-[10px]">
                    <button
                      style={{
                        filter: "drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.10))",
                      }}
                      className="flex items-center justify-center p-[13px] px-[13.09px] border border-input_border_clr bg-input_bg_clr rounded-[48px]"
                      onClick={() => handleEdit(link?.urlCode!)}
                    >
                      <GrEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(link?.urlCode!)}
                      disabled={loading}
                      className="flex items-center justify-center p-[13px] px-[13.09px] border border-input_border_clr bg-input_bg_clr rounded-[48px]"
                    >
                      <AiOutlineDelete />
                    </button>
                  </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* ============= */}
      {/* <div
        style={{
          background:
            "linear-gradient(180deg, rgba(11, 16, 27, 0) 15.74%, rgba(11, 16, 27, 0.57) 50.38%)",
        }}
        className="absolute w-[1421px] h-[148px] left-[153px] top-[1026px] filter blur-[21px] backdrop-blur-[20px] text-white"
      ></div> */}
    </>
  );
};

export default LinkTable;
