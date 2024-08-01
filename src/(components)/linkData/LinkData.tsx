"use client";
import { GrAdd, GrEdit } from "react-icons/gr";
import { AiOutlineDelete } from "react-icons/ai";
import imgFile from "/public/assets/images/linkly.svg";
import { FaCopy } from "react-icons/fa6";
import { TfiLink } from "react-icons/tfi";
import Image from "next/image";
import useLinkData from "./useLinkData";
import { CiFilter } from "react-icons/ci";
import Filter from "../filter/Filter";
import Link from "next/link";
import Loader from "../loader/Loader";

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
    filteredLinks
  } = useLinkData();

  if (url.isLoading) return <Loader/>;

  return (
    <>
      {url?.urls![0]?.user_email && (
        <div className="flex items-center justify-between mb-[28px] ml-[10px]">
          <div className="text-text_secondary font-bold text-[20px]">
            History <span>({filteredLinks?.length})</span>
          </div>
          <div className="flex items-center gap-[10px]">
            <Link href="/url/add">
              <button className="flex items-center justify-center gap-[10px] text-input_txt_clr font-bold text-[15px] bg-brand_grey rounded-full border border-input_border_clr py-[9px] pr-[25.19px] pl-[25px]">
                Custom Slug
                <GrAdd />
              </button>
            </Link>
            <div className="cursor-pointer bg-brand_grey border border-input_border_clr h-[44px] text-input_txt_clr font-bold text-[15px] rounded-[48px] flex items-center justify-center py-[21px] w-[113.19px] pr-[25.19px] pl-[25px] gap-[10px]">
              <CiFilter />
              <Filter onFilterChange={handleFilterChange} />
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full rounded-md" style={{ borderCollapse: 'separate', borderSpacing: '0 3px' }}>
          <thead className="w-full">
            <tr className="text-text_secondary py-[21px] pr-[25.19px] pl-[25px] bg-input_bg_clr">
              <th className="py-[21px] pl-[25px] text-left">Short Link</th>
              <th className="py-[21px] text-left">Original Link</th>
              <th className="py-[21px] text-left">QR Code</th>
              <th className="py-[21px] text-left">Clicks</th>
              <th className="py-[21px] text-left">Status</th>
              <th className="py-[21px] pr-[25.19px] text-left">Date</th>
              {url?.urls![0]?.user_email && <th className="pr-[25.19px] text-left">Action</th>}
            </tr>
          </thead>
          <tbody>
            {filteredLinks?.map((link) => (
              <tr
                key={link.urlCode}
                className="text-text_secondary py-[21px] pr-[25.19px] pl-[25px] backdrop-blur-[28px]"
                style={{
                  backgroundColor: "rgba(24, 30, 41, 0.22)",
                  
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.10)",
                  marginTop: "3px",
                }}
              >
                <td className="pl-[25px] py-[21px]">
                  <div className="flex items-center gap-[10px]">
                    <div className="font-bold">{link.shortUrl}</div>
                    <div className="h-[35px] py-[3.5px] px-[10px] flex items-center justify-center w-[35px] rounded-[31px] bg-copy_button_clr opacity-[69%]">
                      <FaCopy
                        onClick={() => handleCopy(link?.shortUrl!)}
                        className="cursor-pointer h-[28px] w-[15px]"
                      />
                    </div>
                  </div>
                </td>
                <td className="py-[21px]">
                  <div className="flex items-center gap-[10px]">
                    <div className="h-[32px] w-[32px] flex items-center justify-center rounded-[4px]">
                      <Image
                        src={link.iconImg || imgFile}
                        alt=""
                        width={32}
                        height={32}
                      />
                    </div>
                    <div className="font-bold max-w-[300px] text-ellipsis truncate ">{link?.originalUrl}</div>
                  </div>
                </td>
                <td className="py-[21px]">
                  {link.qrCode && (
                    <a href={link.qrCode} download>
                      <Image src={link.qrCode} alt="" width={32} height={32} />
                    </a>
                  )}
                </td>
                <td className="py-[21px]">{link.analytics?.analytic.clicked}</td>
                <td
                  onClick={() => handleToggleStatus(link?.urlCode!, link?.active!)}
                  className="py-[21px] cursor-pointer flex gap-[10px] items-center"
                >
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
                    className={`h-[35px] w-[35px] rounded-[31px] px-[8px] py-[3.5px] ${
                      link?.active ? "bg-active_link_clr" : "bg-inactive_link_clr"
                    } opacity-15 flex items-center justify-center`}
                  >
                    <TfiLink className="text-white" />
                  </div>
                </td>
                <td className="py-[21px] pr-[25.19px]">{formatDate(link?.analytics?.analytic.updatedAt!)}</td>
                {link?.user_email && (
                <td className="py-[21px] pr-[25.19px]">
                  
                    <div className="flex items-center gap-[10px]">
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
                    </td>
                  )}
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div
        style={{
          background:
            "linear-gradient(180deg, rgba(11, 16, 27, 0) 15.74%, rgba(11, 16, 27, 0.57) 50.38%)",
        }}
        className="absolute w-[1421px] h-[148px] left-[153px] top-[1026px] filter blur-[21px] backdrop-blur-[20px] text-white"
      ></div>
    </>
  );
};

export default LinkTable;
